function Lazy(x) { this.__value = x; };

Lazy.of = x => new Lazy(x);

Lazy.prototype.map = function(fn) {
    return Lazy.of(() => this.__value().then(fn));
};

Lazy.prototype.do = function() {
    return this.__value();
};

function thunk() {
    return new Promise((res, rej) => setTimeout(res.bind(null, 100), 3000));
};

var l = Lazy.of(thunk).map(x => x + 50).map(x => x * 2);

l.do().then(console.log.bind(console, 'res'));
// res 300
l.do().then(console.log.bind(console, 'res'));
// res 300
