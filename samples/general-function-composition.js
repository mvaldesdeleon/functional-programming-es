var addTwo = x => x + 2;
var timesThree = x => x * 3;

addTwo(2);
// 4
timesThree(2);
// 6

addTwo(timesThree(2));
// 8
timesThree(addTwo(2));
// 12

var addTwo_timesThree = x => addTwo(timesThree(x));
var timesThree_addTwo = x => timesThree(addTwo(x));

addTwo_timesThree(2);
// 8
timesThree_addTwo(2);
// 12

//  lista de funciones    (acumulador, función)     genera una nueva función...
//  (como array)  \                     \            /
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);
//                                                        /           \
//                ...componiendo la función con el acumulador...   ...cuyo valor inicial es la función identidad

var doALotOfThings = compose(addTwo, timesThree, timesThree, addTwo, timesThree);
//  2 + (3 * (3 * (2 + (3 * x))))

doALotOfThings(2);
// 74