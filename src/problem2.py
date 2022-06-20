from typing import List, Optional, Tuple

def find_near_standers(busStop:List[int], d: int):
    # init hashmap to store all commuters
    # key:value -> position:index
    commuters  = {}

    # add all commuters into the hashTable
    for i in range(len(busStop)):
        commuters[busStop[i]] = i
    
    # iterate through each commuter in hashTable and check if 
    # there is another commuter within value+d
    for commuter in commuters:
        # check distance + d -> runs fixed d times
        for i in range(1,d+1):
            print("Comparing", commuter ,"against", commuter ," + ", i)
            if (commuter + i) in commuters:
                return (commuters[commuter],commuters[commuter + i])
    
    # get this far if no values within range d
    return None
