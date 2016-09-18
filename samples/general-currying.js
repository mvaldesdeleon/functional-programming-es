function addFourNumbers(a, b, c, d) {
    return a + b + c + d;
}

addFourNumbers(1,2,3,4);
// 10

addFourNumbers(1);
// NaN

function addFourNumbersOneByOne(a) {
    return function(b) {
        return function(c) {
            return function(d) {
                return addFourNumbers(a, b, c, d);
            }
        }
    }
}

addFourNumbersOneByOne(1);
// function (b) {...}

addFourNumbersOneByOne(1)(2)(3)(4);
// 10

var addSix = addFourNumbersOneByOne(1)(2)(3);

addSix(6);
// 12

var addFourNumbersOneByOneᐟ = a => b => c => d => addFourNumbers(a, b, c, d);

addFourNumbersOneByOneᐟ(1)(2)(3)(4);
// 10

var addSixᐟ = addFourNumbersOneByOneᐟ(1)(2)(3);

addSixᐟ(6);
// 12

function curry(fn) {
    // dada una función, devuelve otra función...
    return function(...args) {
        var nfn = fn.bind(null, ...args); // ...que genera una tercer función aplicando los argumentos que recibe

        if (nfn.length > 0) return curry(nfn); // si todavía quedan argumentos para aplicar, hacemos lo mismo con esta tercer función
        else return nfn.call(null); // si no quedan argumentos para aplicar, ejecutamos la función
    }
}

var addFourNumbersOneByOneᐟᐟ = curry(addFourNumbers);

addFourNumbersOneByOneᐟᐟ(1)(2)(3)(4);
// 10

addFourNumbersOneByOneᐟᐟ(1,2)(3)(4);
// 10

addFourNumbersOneByOneᐟᐟ(1,2)(3,4);
// 10

addFourNumbersOneByOneᐟᐟ(1)(2,3)(4);
// 10

addFourNumbersOneByOneᐟᐟ(1)(2,3,4);
// 10

addFourNumbersOneByOneᐟᐟ(1,2,3)(4);
// 10

addFourNumbersOneByOneᐟᐟ(1,2,3,4);
// 10
