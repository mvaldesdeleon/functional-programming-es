// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// Promise[a, b] = Resolved[a] ㅣ Rejected[b]

// unit :: a -> Resolved[a]
var unit = x => Promise.resolve(x);
// ʀeject :: b -> Rejected[b]
var ʀeject = x => Promise.reject(x);

// Promise[Number, a]
var promise = new Promise(function(res, rej) {
  // Resolved[Number]
  setTimeout(res.bind(null, 100), 1000);
});

// subtractFifty :: Number -> Number
var subtractFifty = x => x - 50

// timesTwoDelayed :: Number -> Promise[Number, a]
var timesTwoDelayed = x => new Promise((res, rej) => setTimeout(res.bind(null, x * 2), 3000));

// divideTwoBy :: Number -> Promise[Number, String]
var divideTwoBy = function(x) {
    if (x === 0) return ʀeject("can't divide by zero");
    else return unit(2 / x);
};

promise.then(subtractFifty).then(divideTwoBy).then(timesTwoDelayed).then(console.log.bind(console, 'res A'));
// "res A" 0.08

promise.then(subtractFifty).then(subtractFifty).then(divideTwoBy).then(timesTwoDelayed).then(console.log.bind(console, 'res B'));
// ლ(ಠ益ಠლ)

promise.then(subtractFifty).then(subtractFifty).then(divideTwoBy).then(timesTwoDelayed).then(console.log.bind(console, 'res C'), console.log.bind(console, 'rej C'));
// "rej C" "can't divide by zero"