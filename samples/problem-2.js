// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = fn => xs => xs.map(fn);

// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// reduce :: (b -> a -> b) -> b -> [a] -> b
var reduce = fn => acc => xs => xs.reduce(fn, acc);

// addTwo :: Number -> Number
var addTwo = x => x + 2;
// addTwoᐟ :: [Number] -> [Number]
addTwoᐟ = fmap(addTwo);

// timesThree :: Number -> Number
var timesThree = x => x * 3;
// timesThreeᐟ :: [Number] -> [Number]
var timesThreeᐟ = fmap(timesThree);

// doALotOfThingsᐟ :: [Number] -> [Number]
var doALotOfThingsᐟ = compose(addTwoᐟ, timesThreeᐟ, timesThreeᐟ, addTwoᐟ, timesThreeᐟ);
//  2 + (3 * (3 * (2 + (3 * x))))

// Number
var two = 2;

// doALotOfThingsᐟ(two);
// "xs.map is not a function"

// ಠ_ಠ :: Number -> [Number]
var ಠ_ಠ = x => [x];

ಠ_ಠ(two);
// [2]

doALotOfThingsᐟ(ಠ_ಠ(two));
// 74

// unit :: Number -> [Number]
var unit = ಠ_ಠ;
// ʀeturn :: Number -> [Number]
var ʀeturn = ಠ_ಠ;

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// sumArray :: [Number] -> Number
var sumArray = reduce((acc, x) => acc + x)(0);
// sumArrayᐟ :: [Number] -> [Number]
var sumArrayᐟ = compose(unit, sumArray);

// doALotOfThingsMoreᐟ :: [Number] -> [Number]
var doALotOfThingsMoreᐟ = compose(doALotOfThingsᐟ, sumArrayᐟ);

doALotOfThingsMoreᐟ(Ⅰ_Ⅹ);
// [1505]

// lift :: ([Number] -> Number) -> ([Number] -> [Number])
var lift = fn => compose(unit, fn);
var sumArrayᐟᐟ = lift(sumArray);

// doALotOfThingsMoreᐟᐟ :: [Number] -> [Number]
var doALotOfThingsMoreᐟᐟ = compose(doALotOfThingsᐟ, sumArrayᐟᐟ);

doALotOfThingsMoreᐟᐟ(Ⅰ_Ⅹ);
// [1505]