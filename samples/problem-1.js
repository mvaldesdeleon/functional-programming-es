// addTwo :: Number -> Number
var addTwo = x => x + 2;

var Ⅰ_Ⅹ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// addTwoᐟ :: [Number] -> [Number]

// ಠ_ಠ :: (Number -> Number) -> ([Number] -> [Number])
// addTwoᐟ = ಠ_ಠ(addTwo)
// addTwoᐟ(Ⅰ_Ⅹ) == ｡◕‿◕｡

var ಠ_ಠ = function(fn) {
    return function(xs) {
        return xs.map(fn);
    }
};

addTwoᐟ = ಠ_ಠ(addTwo);
addTwoᐟ(Ⅰ_Ⅹ);
// [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

var fmap = ಠ_ಠ;