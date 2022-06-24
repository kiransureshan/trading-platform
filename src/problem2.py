from typing import List, Optional, Tuple
import heapq

def find_near_standers(busStop:List[int], d: int) -> Optional[Tuple]:
    # create a hashmap to store the indices of all value before converting to heap
    # commuter_value : index
    commuters = {}

    for i in range(len(busStop)):
        commuters[busStop[i]] = i

    # create a heap which orders them in ascending order using the given values -> O(n) time
    heapq.heapify(busStop)

    # get the first value to compare against
    last = heapq.heappop(busStop)

    # iterate the whole heap and check for any values that are <= d apart
    while(len(busStop) > 0):
        next = heapq.heappop(busStop)
        if (abs(next-last) <= d):
            return (commuters[next], commuters[last])
        else:
            last = next
    
    # get this far if no values within range d
    return None

