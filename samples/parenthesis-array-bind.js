// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = fn => xs => xs.map(fn);
// unit :: Number -> [Number]
var unit = x => [x];
// lift :: ([Number] -> Number) -> ([Number] -> [Number])
var lift = fn => compose(unit, fn);
// join :: [[Number]] -> [Number]
var join = xss => xss.reduce((acc, xs) => acc.concat(xs), []);
// chain :: (Number -> [Number]) -> ([Number] -> [Number])
var chain = fn => compose(join, fmap(fn));

// (>>=) :: Monad m => m a -> (a -> m b) -> m b
// bind :: [a] -> (a -> [a]) -> [a]
// bindᐟ :: (a -> [a]) -> [a] ->  [a]
// bindᐟ :: (a -> [a]) -> ([a] ->  [a])
var bindᐟ = chain;

// bind :: [a] -> (a -> [a]) -> [a]
var bind = xs => fn => bindᐟ(fn)(xs);

// flip :: (a -> b -> c) -> b -> a -> c
var flip = fn => x => y => fn(y)(x);

// bindᐟᐟ :: [a] -> (a -> [a]) -> [a]
var bindᐟᐟ = flip(bindᐟ);

// flatmap :: [a] -> (a -> [a]) -> [a]
var flatmap = bind;

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// firstNthMultiplesOf :: Number -> Number -> [Number]
var firstNthMultiplesOf = n => x => (Array(n).fill()).reduce((acc, _) => acc.push(x * (acc.length + 1)) && acc, []);

// firstFiveMultiplesOf :: Number -> [Number]
var firstFiveMultiplesOf = firstNthMultiplesOf(5);

chain(firstFiveMultiplesOf)(Ⅰ_Ⅹ);
// [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, 4, 8, 12, 16, 20, 5, 10, 15, 20, 25, 6, 12, 18, 24, 30, 7, 14, 21, 28, 35, 8, 16, 24, 32, 40, 9, 18, 27, 36, 45, 10, 20, 30, 40, 50]

bind(Ⅰ_Ⅹ)(firstFiveMultiplesOf);
// [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, 4, 8, 12, 16, 20, 5, 10, 15, 20, 25, 6, 12, 18, 24, 30, 7, 14, 21, 28, 35, 8, 16, 24, 32, 40, 9, 18, 27, 36, 45, 10, 20, 30, 40, 50]

bindᐟᐟ(Ⅰ_Ⅹ)(firstFiveMultiplesOf);
// [1, 2, 3, 4, 5, 2, 4, 6, 8, 10, 3, 6, 9, 12, 15, 4, 8, 12, 16, 20, 5, 10, 15, 20, 25, 6, 12, 18, 24, 30, 7, 14, 21, 28, 35, 8, 16, 24, 32, 40, 9, 18, 27, 36, 45, 10, 20, 30, 40, 50]
