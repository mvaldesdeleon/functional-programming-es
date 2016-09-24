// Either[a, b] = Left[a] ㅣ Right[b]

function Either(x) { this.__value = x; };

function Left(...args) { Either.call(this, ...args); };
Left.prototype = Object.create(Either.prototype);

function Right(...args) { Either.call(this, ...args); };
Right.prototype = Object.create(Either.prototype);

// ʟeft :: a -> Left[a]
Left.of = x => new Left(x);
// ʀight :: b -> Right[b]
Right.of = x => new Right(x);

Left.of(0) instanceof Left && Left.of(0) instanceof Either && !(Left.of(0) instanceof Right)
// true
Right.of(0) instanceof Right && Right.of(0) instanceof Either && !(Right.of(0) instanceof Left)
// true

// map :: Either[a, x] -> (a -> b) -> Either[b, x]
Either.prototype.map = function(fn) {
    if (this instanceof Right)
        return Right.of(fn(this.__value));
    else
        return this;
};

// plusOne :: Number -> Number
var plusOne = x => x + 1;

// timesTwo :: Number -> Number
var timesTwo = x => x * 2;

// toString :: Number -> String
var toString = x => x.toString();

Right.of(0).map(plusOne).map(timesTwo).map(toString);
// Right {__value: "2"}

// divideTwoBy :: Number -> Eiter[Number, String]
var divideTwoBy = function(x) {
    if (x === 0) return Left.of("can't divide by zero");
    else return Right.of(2 / x);
};

// subtractOne :: Number -> Number
var subtractOne = x => x - 1;

// subtractTwo :: Number -> Number
var subtractTwo = x => x - 2;

Right.of(1).map(subtractOne).map(divideTwoBy).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}
// Right {__value: undefined}

Right.of(1).map(subtractOne).map(divideTwoBy);
// Right {__value: Left}

// join :: Either[Either[a, x], y] -> Either[a, x]
Either.prototype.join = function() {
    return this.__value;
};

// addTen :: Number -> Number
var addTen = x => x + 10;

Right.of(1).map(subtractOne).map(divideTwoBy).join().map(addTen).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}

Right.of(1).map(subtractTwo).map(divideTwoBy).join().map(addTen).map(console.log.bind(console));
// 8
// Right {__value: undefined}

// chain :: Either[a, x] -> (a -> Either[b, y]) -> Either[b, y]
Either.prototype.chain = function(fn) {
    return this.map(fn).join();
};

Right.of(1).map(subtractTwo).chain(divideTwoBy).map(addTen).map(console.log.bind(console));
// 8
// Right {__value: undefined}

Right.of(1).map(subtractOne).chain(divideTwoBy).map(addTen).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}

Right.of(1).map(subtractTwo).chain(divideTwoBy).map(addTen).map(toString);
// Right {__value: "8"}
Right.of(2).map(subtractTwo).chain(divideTwoBy).map(addTen).map(toString);
// Left {__value: "can't divide by zero"}

// unit :: b -> Right[b]
Either.of = x => new Right(x);

Either.of(1).map(subtractTwo).chain(divideTwoBy).map(addTen).map(toString);
// Right {__value: "8"}
Either.of(1).map(subtractOne).chain(divideTwoBy).map(addTen).map(toString);
// Left {__value: "can't divide by zero"}

// do :: Either[a, b] -> (a -> x) -> (b -> x) -> x
Either.prototype.do = function(l, r) {
    if (this instanceof Right)
        return r(this.__value);
    else
        return l(this.__value);
};

// either :: [(a -> x), (b -> x)] -> Either[a, b] -> x
var either = (l, r) => e => e instanceof Left ? l(e.__value) : r(e.__value);

var a = Either.of(1).map(subtractOne).chain(divideTwoBy).map(addTen).map(toString);
var b = Either.of(1).map(subtractTwo).chain(divideTwoBy).map(addTen).map(toString);
var e = either(console.log.bind(console,'this is a left!'), console.log.bind(console, 'this is a right!'));

e(a);
// this is a left! can't divide by zero
e(b);
// this is a right! 8
