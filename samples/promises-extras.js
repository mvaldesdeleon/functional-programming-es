// compose :: [(y -> z), ... ,(b -> c), (a -> b)] -> (a -> z)
var compose = (...fns) => fns.reduce((cfn, fn) => x => cfn(fn(x)), x => x);

// Promise[Number, a] = Resolved[Number] ㅣ Rejected[a]

// Promise[Number, a]
var promise = new Promise(function(res, rej) {
  // Resolved[Number]
  setTimeout(res.bind(null, 100), 1000);
});

// addFifty :: Number -> Number
var addFifty = x => x + 50

// timesTwoDelayed :: Number -> Promise[Number, a]
var timesTwoDelayed = x => new Promise((res, rej) => setTimeout(res.bind(null, x * 2), 1000));
//                                                                 \
//                                                               Resolved[Number]

// then :: (Number -> Number) -> Promise[Number, a] -> Promise[Number, a]
// fmap :: (Number -> Number) -> ([Number] -> [Number])
var fmap = fn => pr => pr.then(fn);

// then :: (Number -> Promise[Number, a]) -> Promise[Number, a] -> Promise[Number, a]
// chain :: (Number -> [Number]) -> ([Number] -> [Number])
var chain = fn => pr => pr.then(fn);

// addFiftyㅣtimesTwoDelayed :: Promise[Number, a] -> Promise[Number, a]
var addFiftyㅣtimesTwoDelayed = compose(fmap(addFifty), chain(timesTwoDelayed));

addFiftyㅣtimesTwoDelayed(promise).then(console.log.bind(console, 'res A'));
// "res A" 250

// Pero fmap != chain. Entonces? then es chain? O es fmap?

// then :: fn -> Promise[Number, a] -> Promise[Number, a]
// then (Number -> [Number]) = chain (Number -> [Number])
// then (Number ->  Number ) = chain (lift (Number -> Number))

// then es chain! Y si la funcion no devuelve Promise, liftea el resultado antes de seguir.
// Podemos usarlo indistintamente como fmap o como chain, con un detalle:

// timesTwoDelayed :: Number -> Promise[Number, a]
// fmap timesTwoDelayed :: Promise[Number, a] -> Promise[Promise[Number, a], a]
// timesTwoDelayedᐟ :: Promise[Number, a] -> Promise[Promise[Number, a], a]
var timesTwoDelayedᐟ = fmap(timesTwoDelayed);

timesTwoDelayedᐟ(promise).then(console.log.bind(console, 'res B'));
// "res B" 200
// Esperariamos que...
// "res B" "[object Promise]"

// Por lo tanto, then no es una "buena" fmap. Promises no permite el concepto de nested Promises.
// fmap siempre es seguido de un join. y recordar que:
// join (fmap fn) = chain fn