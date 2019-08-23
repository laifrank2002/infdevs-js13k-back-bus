# Technical Details

## The city

The city is a 20 by 10 grid of roads. Buses travel along these roads.

For now, there are no bus terminals. We can add those in later.

## Bus routes

Bus routes should include the following information:

- the route number
- the delay between buses (in milliseconds, but this will be randomized)
- start point, end point, and every corner in between.

An example:

```javascript
var Routes = [
    [
        "10", 1500,
        [4, 4], //start point
        [4, 6], //turn at (4, 6)
        [7, 6], //turn at (7, 6)
        [7, 5], //and so on...
        [6, 5],
        [6, 6] //end point
    ]
];
```

## Buses

Buses run on routes. They should contain the following information:

- x
- y
- width
- height
- active (boolean)
- clickable (function, depends on game state)
- action when clicked (function)
- mouseover text

- route
- heading (in radians)
- next stop
- running route forwards or backwards? (boolean)