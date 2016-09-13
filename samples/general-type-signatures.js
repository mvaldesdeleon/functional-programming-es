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

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// filter :: Array -> Function -> Array
// filterᐟ :: [a] -> (a -> Boolean) -> [a]
var filterᐟ = xs => pr => xs.filter(pr);

filterᐟ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(x => x % 2);
// [1, 3, 5, 7, 9]

// filterMyList :: (a -> Boolean) -> [a]
var filterMyList = filterᐟ(Ⅰ_Ⅹ);

filterMyList(x => x % 2);
// [1, 3, 5, 7, 9]
filterMyList(x => x % 3);
// [1, 2, 4, 5, 7, 8, 10]

// filterᐟᐟ :: (a -> Boolean) -> [a] -> [a]
var filterᐟᐟ = pr => xs => xs.filter(pr);

// filterMultiplesOfTwo :: [a] -> [a]
var filterMultiplesOfTwo = filterᐟᐟ(x => x % 2);

filterMultiplesOfTwo(Ⅰ_Ⅹ);
// [1, 3, 5, 7, 9]

// filterMultiplesOfThree :: [a] -> [a]
var filterMultiplesOfThree = filterᐟᐟ(x => x % 3);
filterMultiplesOfThree(Ⅰ_Ⅹ);
// [1, 2, 4, 5, 7, 8, 10]

// filterMultiplesOfSix :: [a] -> [a]
var filterMultiplesOfSix = x => filterMultiplesOfThree(filterMultiplesOfTwo(x));

filterMultiplesOfSix(Ⅰ_Ⅹ);
// [1, 5, 7]

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