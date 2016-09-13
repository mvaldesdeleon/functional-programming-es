// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// Promise[Number, a] = Resolved[Number] ㅣ Rejected[a]

// Promise[Number, a]
var promise = new Promise(function(res, rej) {
  // Resolved[Number]
  setTimeout(res.bind(null, 100), 1000);
});

promise.then(console.log.bind(console, 'res A'));
// "res A" 100

// addFifty :: Number -> Number
var addFifty = x => x + 50

var promiseᐟ = promise.then(addFifty);

promise.then(console.log.bind(console, 'res B'));
// "res B" 100

promiseᐟ.then(console.log.bind(console, 'res C'));
// "res C" 150

// timesTwoDelayed :: Number -> Promise[Number, a]
var timesTwoDelayed = x => new Promise((res, rej) => setTimeout(res.bind(null, x * 2), 1000));
//                                                                 \
//                                                               Resolved[Number]

var promiseᐟᐟ = promise.then(addFifty).then(timesTwoDelayed);

promiseᐟᐟ.then(console.log.bind(console, 'res D'));
// "res D" 300

// then :: (Number -> Number) -> Promise[Number, a] -> Promise[Number, a]
// then :: (Number -> Number) -> (Promise[Number, a] -> Promise[Number, a])
// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = fn => pr => pr.then(fn);

// then :: (Number -> Promise[Number, a]) -> Promise[Number, a] -> Promise[Number, a]
// then :: (Number -> Promise[Number, a]) -> (Promise[Number, a] -> Promise[Number, a])
// chain :: (Number -> [Number]) -> ([Number] -> [Number])
var chain = fn => pr => pr.then(fn);

// addFiftyㅣtimesTwoDelayed :: Promise[Number, a] -> Promise[Number, a]
var addFiftyㅣtimesTwoDelayed = compose(fmap(addFifty), chain(timesTwoDelayed));

addFiftyㅣtimesTwoDelayed(promise).then(console.log.bind(console, 'res E'));
// "res E" 250

// Pero fmap != chain. Entonces?