function Lazy(x) { this.__value = x; };

// unit :: (a -> Promise[b, x]) -> Lazy[a -> Promise[b, x]]
Lazy.of = x => new Lazy(x);

// map :: Lazy[a -> Promise[b, x]] -> (b -> c) -> Lazy[a -> Promise[c, x]]
// map :: Lazy[a -> Promise[b, x]] -> (b -> Promise[c, y]) -> Lazy[a -> Promise[c, y]]
Lazy.prototype.map = function(fn) {
    return Lazy.of((x) => this.__value(x).then(fn));
};

// do :: Lazy[a -> Promise[b, z]] -> a -> Promise[b, z]
Lazy.prototype.do = function(x) {
    return this.__value(x);
};

// thunk :: Number -> Promise[Number, a]               Resolved[Number]
function thunk(n) { //                               /
    return new Promise((res, rej) => setTimeout(res.bind(null, 100 * n), 1500 * n));
};

// addFifty :: Number -> Number
var addFifty = x => x + 50

// timesTwoDelayed :: Number -> Promise[Number, a]
var timesTwoDelayed = x => new Promise((res, rej) => setTimeout(res.bind(null, x * 2), 1000));
//                                                                 \
//                                                               Resolved[Number]

var lazy = Lazy.of(thunk).map(addFifty).map(timesTwoDelayed);

lazy.do(1).then(console.log.bind(console, 'res'));
// res 300
lazy.do(2).then(console.log.bind(console, 'res'));
// res 500
lazy.do(3).then(console.log.bind(console, 'res'));
// res 700