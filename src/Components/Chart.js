import { useEffect, useRef, useState } from 'react';
import '../ComponentStyling/Chart.css';

function Chart () {

//define state variables
  const chart = useRef(null);
  const chartCtx = useRef(null);
  const xScale = useRef(null);
  const xScaleCtx = useRef(null);
  const yScale = useRef(null);
  const yScaleCtx = useRef(null);

  var lastX = useRef(0);
  var lastY = useRef(0);
  var mouseIsDown = useRef(false);
  var mouseOnXScale = useRef(false);
  var mouseOnYScale = useRef(false);


  // TODO: check if need to be state, ref, or normal var based on re-rendering needs
  const maxHigh = 100;
  const minLow = 20;
  const scaleWidth = 30;
  const numYTicks = useRef(20);
  // updated on scroll for more data
  const numCandles = useRef(100);
  // fixed, updated on screen resize
  const chartHeight = useRef(600);
  const chartWidth = useRef(1500);
  const [candleWidth, setCandleWidth]= useState(7);
  const candleContWidth = useRef(5.5 + candleWidth);
  // how far from the left have we scrolled
  // TODO: change to right offset once working, AND combine into one stare variable {left:0,top:0}
  const [leftOffset, setLeftOffset] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const [yScaleFactor, setYScaleFactor] = useState(1);

  var candleData = useRef(
  [
    {
      "open": 75.00,
      "high": 100.00,
      "low": 65.00,
      "close": 70.00
    },
    {
      "open": 40.00,
      "high": 58.00,
      "low": 20.00,
      "close": 55.50
    },
    {
      "open": 50.00,
      "high": 60.00,
      "low": 35.00,
      "close": 55.50
    },
  ]);

  // init chart/state variables
  useEffect(() => {
    chart.current=document.getElementById("mainChart");
    chartCtx.current=chart.current.getContext("2d");
    chartCtx.current.lineWidth = 0.5;

    xScale.current=document.getElementById("xScale");
    xScaleCtx.current=xScale.current.getContext("2d");

    yScale.current=document.getElementById("yScale");
    yScaleCtx.current=yScale.current.getContext("2d");
    handleResize(chart.current, xScale.current, yScale.current);
  }, [])

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
    drawAllCandles();
  }

  useEffect(() => {
    candleContWidth.current = 5.5 + candleWidth;
    drawAllCandles();
  })

  const drawAllCandles = () => {
      chartCtx.current.clearRect(0,0,chart.current.width,chart.current.height);
      xScaleCtx.current.clearRect(0,0,chartWidth.current,scaleWidth);
      yScaleCtx.current.clearRect(0,0,scaleWidth,chartWidth.current);
      drawScaleContainers();
      for (let i = numCandles.current - 1 ; i >= 0; i--){
        drawCandle(candleData.current[i%3],i);
      }
  }

  function drawCandle (candle, candleNum) {
    let dataWindow  = maxHigh-minLow;

    // coordinates of the OHLC values adjusted for the chart size
    let high = Math.abs(((candle.high - maxHigh)/dataWindow)*chartHeight.current)*yScaleFactor;
    let low = Math.abs(((candle.low - maxHigh)/dataWindow)*chartHeight.current)*yScaleFactor;
    let open = Math.abs(((candle.open - maxHigh)/dataWindow)*chartHeight.current)*yScaleFactor;
    let close = Math.abs(((candle.close - maxHigh)/dataWindow)*chartHeight.current)*yScaleFactor;


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
      drawScaleTick(midPointX);
    }
  };

  function drawScaleTick(x){
    xScaleCtx.current.beginPath();
    xScaleCtx.current.moveTo(x,scaleWidth);
    xScaleCtx.current.lineTo(x, scaleWidth - 10);
    xScaleCtx.current.closePath();
    xScaleCtx.current.fillStyle= "white";
    xScaleCtx.current.strokeStyle = "white";
    xScaleCtx.current.fill();
    xScaleCtx.current.stroke();
  }

  function drawScaleContainers(){
    // x-scale container
    xScaleCtx.current.beginPath();
    xScaleCtx.current.moveTo(0,0);
    xScaleCtx.current.lineTo(chartWidth.current, 0);
    xScaleCtx.current.closePath();
    xScaleCtx.current.fill();
    xScaleCtx.current.stroke();

    //y-scale container
    let interval = chartHeight.current/((numYTicks.current-1))*yScaleFactor;
    yScaleCtx.current.beginPath();
    for ( var i = 0; i < numYTicks.current; i++){
      yScaleCtx.current.moveTo(10,interval*i + topOffset);
      yScaleCtx.current.lineTo(scaleWidth, interval*i + topOffset);
    }
    yScaleCtx.current.closePath();
    yScaleCtx.current.fillStyle= "white";
    yScaleCtx.current.strokeStyle = "white";
    yScaleCtx.current.fill();
    yScaleCtx.current.stroke();

    yScaleCtx.current.beginPath();
    yScaleCtx.current.moveTo(0,0);
    yScaleCtx.current.lineTo(0, chartHeight.current);
    yScaleCtx.current.closePath();
    yScaleCtx.current.fill();
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
    <div className='col-md-10 p-5'>
      <div className="chartContainer">
      <div id="mainChartDiv" className='col-11 p-0'>
        <canvas id="mainChart" width="1500" height="600"
          onMouseDown={mouseDown}
          onMouseUp = {mouseUp}
          onMouseMove = {chartMouseMove}/>
      </div>
      <div className='col-1 p-0'>
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