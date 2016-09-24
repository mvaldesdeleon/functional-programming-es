2+2;
// 4

var four = 2 + 2;

four;
// 4

four;
// 4

var four = function() {
    return 2 + 2;
};

four();
// 4

four();
// 4

//                                                aca hay otro thunk ;-)
function thunk() { //                                 /
    return new Promise((res, rej) => setTimeout(res.bind(null, 100), 3000));
}

thunk().then(console.log.bind(console, 'res'));
// "res" 300

thunk().then(console.log.bind(console, 'res'));
// "res" 300

thunk().then(console.log.bind(console, 'res'));
// "res" 300