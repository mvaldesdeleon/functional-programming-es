function Either(x) { this.__value = x; };

function Left(...args) { Either.call(this, ...args); };
Left.prototype = Object.create(Either.prototype);

function Right(...args) { Either.call(this, ...args); };
Right.prototype = Object.create(Either.prototype);

Left.of = x => new Left(x);
Right.of = x => new Right(x);

Left.of(0) instanceof Left && Left.of(0) instanceof Either && !(Left.of(0) instanceof Right)
// true
Right.of(0) instanceof Right && Right.of(0) instanceof Either && !(Right.of(0) instanceof Left)
// true

Either.prototype.map = function(fn) {
    if (this instanceof Right)
        return Right.of(fn(this.__value));
    else
        return this;
};

Right.of(0).map(x => x + 1).map(x => x * 2).map(x => x.toString());
// Right {__value: "2"}

var divideTwoBy = function(x) {
    if (x === 0) return Left.of("can't divide by zero");
    else return Right.of(2 / x);
};

Right.of(1).map(x => x - 1).map(divideTwoBy).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}
// Right {__value: undefined}

Right.of(1).map(x => x - 1).map(divideTwoBy);
// Right {__value: Left}

Either.prototype.join = function() {
    return this.__value;
};

Right.of(1).map(x => x - 1).map(divideTwoBy).join().map(x => x + 10).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}

Right.of(1).map(x => x - 2).map(divideTwoBy).join().map(x => x + 10).map(console.log.bind(console));
// 8
// Right {__value: undefined}

Either.prototype.chain = function(fn) {
    return this.map(fn).join();
};

Right.of(1).map(x => x - 2).chain(divideTwoBy).map(x => x + 10).map(console.log.bind(console));
// 8
// Right {__value: undefined}

Right.of(1).map(x => x - 1).chain(divideTwoBy).map(x => x + 10).map(console.log.bind(console));
// Left {__value: "can't divide by zero"}

Right.of(1).map(x => x - 2).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
// Right {__value: "8"}
Right.of(2).map(x => x - 2).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
// Left {__value: "can't divide by zero"}

Either.of = x => new Right(x);

Either.of(1).map(x => x - 2).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
// Right {__value: "8"}
Either.of(1).map(x => x - 1).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
// Left {__value: "can't divide by zero"}

Either.prototype.do = function(l, r) {
    if (this instanceof Right)
        return r(this.__value);
    else
        return l(this.__value);
};

var either => (l, r) = e => e instanceof Left ? l(e.__value) : r(e.__value);

var a = Either.of(1).map(x => x - 1).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
var b = Either.of(1).map(x => x - 2).chain(divideTwoBy).map(x => x + 10).map(x => x.toString());
var e = either(console.log.bind(console,'this is a left!'), console.log.bind(console, 'this is a right!');

e(a);
// this is a left! can't divide by zero
e(b);
// this is a right! 8
