// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = fn => xs => xs.map(fn);

// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = fn => acc => xs => xs.reduce(fn, acc);

// unit :: Number -> [Number]
var unit = x => [x];

// sumArray :: [Number] -> Number
var sumArray = reduce((acc, x) => acc + x)(0);
// sumArrayᐟ :: [Number] -> [Number]
var sumArrayᐟ = compose(unit, sumArray);

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// firstNthMultiplesOf :: Number -> Number -> [Number]
var firstNthMultiplesOf = n => x => (Array(n).fill()).reduce((acc, _) => acc.push(x * (acc.length + 1)) && acc, []);

// firstFiveMultiplesOf :: Number -> [Number]
var firstFiveMultiplesOf = firstNthMultiplesOf(5);
// firstFiveMultiplesOfᐟ :: [Number] -> [[Number]]
var firstFiveMultiplesOfᐟ = fmap(firstFiveMultiplesOf)

firstFiveMultiplesOfᐟ(Ⅰ_Ⅹ);
// [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10], [3, 6, 9, 12, 15], [4, 8, 12, 16, 20], [5, 10, 15, 20, 25], [6, 12, 18, 24, 30], [7, 14, 21, 28, 35], [8, 16, 24, 32, 40], [9, 18, 27, 36, 45], [10, 20, 30, 40, 50]]

// ಠ_ಠ :: [[Number]] -> [Number]
var ಠ_ಠ = xss => xss.reduce((acc, xs) => acc.concat(xs), []);

ಠ_ಠ(firstFiveMultiplesOfᐟ(Ⅰ_Ⅹ));
// [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, 4, 8, 12, 16, 20, 5, 10, 15, 20, 25, 6, 12, 18, 24, 30, 7, 14, 21, 28, 35, 8, 16, 24, 32, 40, 9, 18, 27, 36, 45, 10, 20, 30, 40, 50]

// join :: [[Number]] -> [Number]
var join = ಠ_ಠ;
// flatten :: [[Number]] -> [Number]
var flatten = ಠ_ಠ;

// firstFiveMultiplesOf :: Number -> [Number]
// join (fmap firstFiveMultiplesOf) :: [Number] -> [Number]

// chain :: (Number -> [Number]) -> ([Number] -> [Number])
var chain = fn => compose(join, fmap(fn));

chain(firstFiveMultiplesOf)(Ⅰ_Ⅹ);
// [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, 4, 8, 12, 16, 20, 5, 10, 15, 20, 25, 6, 12, 18, 24, 30, 7, 14, 21, 28, 35, 8, 16, 24, 32, 40, 9, 18, 27, 36, 45, 10, 20, 30, 40, 50]
