// addTwo :: Number -> Number
var addTwo = x => x + 2;

// toString :: Number -> String
var toString = x => x.toString();

// parseNum :: String -> Number
var parseNum = x => parseFloat(x);

addTwo(2);
// 2

toString(2);
// "2"

parseNum('12.34');
// 12.34

addTwo('hello');
// "hello2"

addTwo([]);
// "2"

addTwo({});
// "[object Object]2"

addTwo(undefined);
// NaN


// add :: (Number, Number) -> Number
var add = (x,y) => x + y;

add(1,2);
// 3

//  addᐟ :: Number -> Number -> Number
//  addᐟ :: Number -> (Number -> Number)
var addᐟ = x => y => x + y;

addᐟ(2);
// function {...}

addᐟ(2)(3);
// 5

// map :: Array -> Function -> Array
// mapᐟ :: [a] -> (a -> a) -> [a]
// mapᐟᐟ :: [a] -> (a -> b) -> [b]
var mapᐟᐟ = xs => fn => xs.map(fn);

mapᐟᐟ([1, 2, 3, 4, 5])(addTwo);
// [3, 4, 5, 6, 7]

// mapOnMyList :: (a -> b) -> [b]
var mapOnMyList = mapᐟᐟ([1, 2, 3, 4, 5]);

mapOnMyList(addTwo);
// [3, 4, 5, 6, 7]
mapOnMyList(addᐟ(-1));
// [0, 1, 2, 3, 4]

// mapᐟᐟᐟ :: (a -> b) -> [a] -> [b]
var mapᐟᐟᐟ = fn => xs => xs.map(fn);

// addTwoᐟ :: [a] -> [b]
var addTwoᐟ = mapᐟᐟᐟ(addTwo);

addTwoᐟ([1, 2, 3, 4, 5]);
// [3, 4, 5, 6, 7]

// addFourᐟ :: [a] -> [b]
var addFourᐟ = x => addTwoᐟ(addTwoᐟ(x));

addFourᐟ([1, 2, 3, 4, 5]);
// [5, 6, 7, 8, 9]

// reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = fn => acc => xs => xs.reduce(fn, acc);

// sumArray :: [a] -> b
var sumArray = reduce((acc, x) => acc + x)(0);

sumArray([1, 2, 3, 4, 5]);
// 15

var a = parseNum('12.34'); // String -> Number
var b = addTwo(a);         // Number -> Number
var c = toString(b);       // Number -> String
// "14.34"

var a = parseNum('12.34'); // String -> Number
var b = toString(a);       // Number -> String
var c = addTwo(b);         // Number -> Number
// "12.342"