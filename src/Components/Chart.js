import { useEffect, useRef, useState } from 'react';
import '../ComponentStyling/Chart.css';
import ChartMenu from './ChartMenu';

function Chart ({stompClient,newStreamFunc}) {

  //define state variables
  const chart = useRef(null);
  const chartCtx = useRef(null);
  const xScale = useRef(null);
  const xScaleCtx = useRef(null);
  const yScale = useRef(null);
  const yScaleCtx = useRef(null);
  const initialRender = useRef(false);

  var lastX = useRef(0);
  var lastY = useRef(0);
  var mouseIsDown = useRef(false);
  var mouseOnXScale = useRef(false);
  var mouseOnYScale = useRef(false);

  const maxHigh = useRef(150);
  const minLow = useRef(-20);
  const scaleWidth = 30;
  const numYTicks = 20;

  // updated on scroll for more data
  const numCandles = useRef(0);
  // fixed, updated on screen resize
  const chartHeight = useRef(600);
  const chartWidth = useRef(1500);
  const [candleWidth, setCandleWidth]= useState(7);
  const candleContWidth = useRef(5.5 + candleWidth);

  // how far from the left have we scrolled
  // TODO: change to right offset once working, AND combine into one state variable {left:0,top:0}
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [yScaleFactor, setYScaleFactor] = useState(1);
  const [candleData, setCandleData] = useState([]);
  const currentCandle = useRef({});

  const subscribeToStream = () => {
    if(stompClient.connected === true && !initialRender.current){
      // update to ensure we dont subscribe more than once to data stream
      initialRender.current = true;
      stompClient.subscribe('/stream/candleData/barHistory', handleBulkBars);
      newStreamFunc("AAPL");
    } else if (stompClient.connected === true && initialRender.current){
        return;
    } else {
        console.log("Tried to stream from socket, but not connected!");
        setTimeout(() => subscribeToStream(),5000);
    }
  } 
  const handleBulkBars = (payload) => {
      const message = JSON.parse(payload.body);
      numCandles.current = message.length;
      setCandleData(message);
      stompClient.subscribe("/stream/candleData",handleLiveData);
      stompClient.subscribe("/stream/newCandleBar", handleNewBar);

      // remove loading icon
      let loadIcon = document.getElementById("loading-cont");
      if(loadIcon != null){
        loadIcon.remove();
      }
  }

  const handleNewBar = (payload) => {
    const message = [JSON.parse(payload.body)];
    currentCandle.current = {"open":null, "close":null, "high":null,"low":null};
    setCandleData(prevData => ([...prevData,...message]));
  }

  const handleLiveData = (payload) => {
    let message = JSON.parse(payload.body);
    let price = parseFloat(((message.askPrice + message.bidPrice)/2).toFixed(2));
    if (currentCandle.current.high == null){
      currentCandle.current = {"open":price, "close":price, "high":price,"low":price};
    } else {
      currentCandle.current ={
          "open":currentCandle.current.open, 
          "close":price, 
          "high":Math.max(currentCandle.current.high,price),
          "low":Math.min(currentCandle.current.low,price)
      };
    }
    // flicker state to trigger re-render
    setCandleData(prevData => ([...prevData]));
  }


  // init once only chart/state variables
  useEffect(() => {
    chart.current=document.getElementById("mainChart");
    chartCtx.current=chart.current.getContext("2d");
    chartCtx.current.lineWidth = 0.5;

    xScale.current=document.getElementById("xScale");
    xScaleCtx.current=xScale.current.getContext("2d");

    yScale.current=document.getElementById("yScale");
    yScaleCtx.current=yScale.current.getContext("2d");
    handleResize(chart.current, xScale.current, yScale.current);
    subscribeToStream();
  }, [])

  // on every re-render b/c no dependency array specified
  useEffect(() => {
    candleContWidth.current = 5.5 + candleWidth;
    numCandles.current = candleData.length;
    drawAllCandles(numCandles.current, candleData);
    drawCandle(currentCandle.current, numCandles.current);
  })

  function handleResize(chartEl, xScaleEl, yScaleEl){
    const chartDiv = document.getElementById("mainChartDiv");
    const newChartWidth = chartDiv.offsetWidth;
    const newChartHeight = chartDiv.offsetHeight;
    chartEl.width = newChartWidth;
    chartEl.height = newChartHeight;
    chartWidth.current = newChartWidth;
    chartHeight.current = newChartHeight;
    xScaleEl.width = chartWidth.current;
    yScaleEl.height = chartHeight.current;
    candleContWidth.current = 5.5 + candleWidth;
    drawAllCandles(numCandles.current, candleData);
  }

  const drawAllCandles = (numberOfCandles, data) => {
      chartCtx.current.clearRect(0,0,chart.current.width,chart.current.height);
      xScaleCtx.current.clearRect(0,0,chartWidth.current,scaleWidth);
      yScaleCtx.current.clearRect(0,0,scaleWidth,chartHeight.current);
      calcMaxMin(data);
      drawScaleContainers();
      for (let i = numberOfCandles - 1; i >= 0; i--){
        drawCandle(data[i],i);
      }
  }

  function calcMaxMin(data){
    var max = 0;
    var min = Number.POSITIVE_INFINITY;
    data.forEach(candle => {
      max = Math.max(max,candle.high);
      min = Math.min(min,candle.low);
    })
    maxHigh.current = max + (max-min)/2;
    minLow.current = min - (max-min)/2;
  }

  function drawCandle (candle, candleNum) {
    if(candle == null || candle.open == null){
      return;
    }

    let dataWindow  = maxHigh.current-minLow.current;
    // coordinates of the OHLC values adjusted for the chart size
    let high = Math.abs(((candle.high - maxHigh.current)/dataWindow)*chartHeight.current)*yScaleFactor;
    let low = Math.abs(((candle.low - maxHigh.current)/dataWindow)*chartHeight.current)*yScaleFactor;
    let open = Math.abs(((candle.open - maxHigh.current)/dataWindow)*chartHeight.current)*yScaleFactor;
    let close = Math.abs(((candle.close - maxHigh.current)/dataWindow)*chartHeight.current)*yScaleFactor;
    // x-coordinate of the start of the candle
    let candleLeft = candleNum*(candleContWidth.current) + leftOffset;
    
    //draw LOW and HIGH wicks BEHIND candle
    chartCtx.current.beginPath();
    let midPointX = candleLeft + (candleWidth/2);
    chartCtx.current.moveTo(midPointX, high+topOffset);
    chartCtx.current.lineTo(midPointX, low + topOffset);
    chartCtx.current.closePath();
    chartCtx.current.fillStyle= "white";
    chartCtx.current.strokeStyle = "white";
    chartCtx.current.fill();
    chartCtx.current.stroke();

    // draw candle body
    chartCtx.current.beginPath();
    let candleColor = open>=close ? "green" : "red";
    chartCtx.current.strokeStyle = candleColor;
    chartCtx.current.fillStyle = candleColor;
    // drawn from bottom left of candle
    chartCtx.current.fillRect(candleLeft, Math.min(open,close)+ topOffset,candleWidth,Math.abs(open-close));
    chartCtx.current.closePath();
    chartCtx.current.fill();
    chartCtx.current.stroke();

    // draw timeScale tick for the candle
    if(candleNum%5 === 0){
      drawXScaleTick(midPointX);
    }
  };

  function drawXScaleTick(x){
    xScaleCtx.current.beginPath();
    xScaleCtx.current.moveTo(x,0);
    xScaleCtx.current.lineTo(x, scaleWidth/2);
    xScaleCtx.current.closePath();
    xScaleCtx.current.strokeStyle = "#acacb5";
    xScaleCtx.current.fill();
    xScaleCtx.current.stroke();
  }

  function drawScaleContainers(){
    // x-scale container
    xScaleCtx.current.beginPath();
    xScaleCtx.current.moveTo(0,0);
    xScaleCtx.current.lineTo(chartWidth.current, 0);
    xScaleCtx.current.closePath();
    xScaleCtx.current.stroke();

    //y-scale container and ticks
    let interval = chartHeight.current/((numYTicks-1))*yScaleFactor;
    yScaleCtx.current.beginPath();
    for ( var i = 0; i < numYTicks; i++){
      yScaleCtx.current.moveTo(0,interval*i + topOffset);
      yScaleCtx.current.lineTo(scaleWidth/2, interval*i + topOffset);
    }
    yScaleCtx.current.closePath();
    yScaleCtx.current.strokeStyle = "#acacb5";
    yScaleCtx.current.stroke();

    yScaleCtx.current.beginPath();
    yScaleCtx.current.moveTo(0,0);
    yScaleCtx.current.lineTo(0, chartHeight.current);
    yScaleCtx.current.closePath();
    yScaleCtx.current.stroke();
  }

  function mouseDown(e){
    // calculate the position 
    lastX.current = parseInt(e.clientX);
    lastY.current = parseInt(e.clientY);
    mouseIsDown.current = true;
  }

  function mouseUp(e){
    mouseIsDown.current = false;
    mouseOnXScale.current = false;
    mouseOnYScale.current = false;
    return;
  }

  function xScaleMouseDown(){
    mouseOnXScale.current = true;
    return;
  }

  function yScaleMouseDown(){
    mouseOnYScale.current = true;
  }

  function chartMouseMove(e){
    if (!mouseIsDown.current){
      return;
    }
    var changeX = parseInt(e.clientX - lastX.current);
    lastX.current = e.clientX;
    // scale chart on x-axis
    if (mouseOnXScale.current){
      (changeX >= 0) ? setCandleWidth(candleWidth * 1.1) : setCandleWidth(candleWidth * 0.9);
      return;
    }
    var changeY = parseInt(e.clientY - lastY.current);
    lastY.current = e.clientY;
    if (mouseOnYScale.current){
      (changeY >= 0) ? setYScaleFactor(yScaleFactor * 1.03) : setYScaleFactor(yScaleFactor * 0.97);
      return;
    }
    setLeftOffset(leftOffset + changeX);
    setTopOffset(topOffset + changeY);
    return;
  }

  return(
    <div className='col-lg-10 col-md-9 col-12 chartContainer'>
      <ChartMenu stompClient={stompClient} newStreamFunc = {newStreamFunc}/>
      <div className="mainChartContainer">
        <div id="mainChartDiv" className='p-0 w-100' >
          <canvas id="mainChart" width="1500" height="600" ticker = ""
            onMouseDown={mouseDown}
            onMouseUp = {mouseUp}
            onMouseMove = {chartMouseMove}/>
        </div>
        <div className="spinner-border text-secondary loading-cont" role="status" id="loading-cont">
          <span className="sr-only">Loading...</span>
        </div>
        <div className='p-0'>
          <canvas id="yScale" width="30" height="600"
          onMouseDown={(e) => {yScaleMouseDown(e); mouseDown(e)}}
          onMouseUp = {mouseUp}
          onMouseMove = {chartMouseMove} />
        </div>
      </div>
      <canvas id="xScale" width="1500" height="30" 
          onMouseDown={(e) => {xScaleMouseDown(e); mouseDown(e);}}
          onMouseUp = {mouseUp}
          onMouseMove = {chartMouseMove}/>
    </div>
  )
}

export default Chart;