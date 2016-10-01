// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// f :: a -> b
// g :: b -> c
// Functor F => F (g . f) = F g . F f
// fmap(compose(g, f)) = compose(fmap(g), fmap(f))

// Functor []

// fmap :: (a -> b) -> ([a] -> [b])
var fmap = fn => xs => xs.map(fn);

// addTwo :: Number -> Number
var addTwo = x => x + 2;

// timesThree :: Number -> Number
var timesThree = x => x * 3;

// flip :: (a -> b -> c) -> b -> a -> c
var flip = fn => x => y => fn(y)(x);

// firstNthMultiplesOf :: Number -> Number -> [Number]
var firstNthMultiplesOf = n => x => (Array(n).fill()).reduce((acc, _) => acc.push(x * (acc.length + 1)) && acc, []);
var firstNthNaturals = flip(firstNthMultiplesOf)(1);

var Ⅰ_ⅯⅯ = firstNthNaturals(1000000);

var t0 = performance.now();
compose(fmap(addTwo), fmap(timesThree))(Ⅰ_ⅯⅯ);
var t1 = performance.now();

console.log('compose(fmap(g), fmap(f))', t1 - t0, 'ms');
// "compose(fmap(g), fmap(f))" 225.44499999999994 "ms"

var t2 = performance.now();
fmap(compose(addTwo, timesThree))(Ⅰ_ⅯⅯ);
var t3 = performance.now();

console.log('fmap(compose(g, f))', t3 - t2, 'ms');
// "fmap(compose(g,f))" 134.97500000000002 "ms"
