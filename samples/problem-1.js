// addTwo :: Number -> Number
var addTwo = x => x + 2;

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// addTwoᐟ :: [Number] -> [Number]

// ಠ_ಠ :: (Number -> Number) -> ([Number] -> [Number])
// addTwoᐟ = ಠ_ಠ(addTwo)
// addTwoᐟ(Ⅰ_Ⅹ) == ｡◕‿◕｡

// ಠ_ಠ :: (Number -> Number) -> ([Number] -> [Number])
var ಠ_ಠ = function(fn) {
    return function(xs) {
        return xs.map(fn);
    }
};

// addTwoᐟ :: [Number] -> [Number]
addTwoᐟ = ಠ_ಠ(addTwo);
addTwoᐟ(Ⅰ_Ⅹ);
// [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = ಠ_ಠ;

// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// timesThree :: Number -> Number
var timesThree = x => x * 3;
// timesThreeᐟ :: [Number] -> [Number]
var timesThreeᐟ = fmap(timesThree);

// doALotOfThingsᐟ :: [Number] -> [Number]
var doALotOfThingsᐟ = compose(addTwoᐟ, timesThreeᐟ, timesThreeᐟ, addTwoᐟ, timesThreeᐟ);
//  2 + (3 * (3 * (2 + (3 * x))))

doALotOfThingsᐟ(Ⅰ_Ⅹ);
// [47, 74, 101, 128, 155, 182, 209, 236, 263, 290]