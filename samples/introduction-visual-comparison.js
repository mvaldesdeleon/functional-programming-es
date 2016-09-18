// jQuery

/*
<ul>
  <li class="item">
    <div class="wrap wrap-1">A.1</div>
    <div class="wrap wrap-2">A.2</div>
  </li>
  <li>
    <div class="wrap wrap-1">B.1</div>
    <div class="wrap wrap-2">B.2</div>
  </li>
  <li class="item">
    <div class="wrap wrap-1">C.1</div>
    <div class="wrap wrap-2">C.2</div>
  </li>
  <li>
    <div class="wrap wrap-1">D.1</div>
    <div class="wrap wrap-2">D.2</div>
  </li>
  <li class="item">
    <div class="wrap wrap-1">E.1</div>
    <div class="wrap wrap-2">E.2</div>
  </li>
</ul>
*/

// Imperativo

var li = document.getElementsByTagName('li');

var filtered = [];
for (let i = 0; i < li.length; i++) {
    if (li[i].classList.contains('item')) {
        filtered.push(li[i]);
    }
}

for (let i = 0; i < filtered.length; i++) {
    for (let j = 0; j < filtered[i].children.length; j++) {
        let div = document.createElement('div');

        div.classList.add('title');
        div.innerHTML = 'Hello!';
        filtered[i].children[j].insertAdjacentElement('afterbegin', div);
    }
}

// Funcional

$('li')
    .filter('.item')
    .children()
        .prepend(
            $('<div>')
                .addClass('title')
                .html('Hello!')
        );


// Arrays

var list = [{name: 'John', age: 17}, {name: 'Susan', age: 23}, {name: 'Mike', age: 18}, {name: 'Alice', age: 20}];

// Imperativo

var filtered = [];
for (let i = 0; i < list.length; i++) {
    if (list[i].age >= 18) {
        filtered.push(list[i]);
    }
}

var sorted = [];
for (let i = 0; i < filtered.length; i++) {
    let max = i;
    for (let j = i; j < filtered.length; j++) {
        if (filtered[j].age > filtered[max].age) {
            max = j;
        }

    }
    sorted[i] = filtered[max];
    filtered[max] = filtered[i];
}

var uppercaseNames = [];
for (let i = 0; i < sorted.length; i++) {
    uppercaseNames[i] = sorted[i].name.toUpperCase();
}

// Funcional

list
    .filter(x => x.age >= 18)
    .sort((a, b) => b.age - a.age)
    .map(x => x.name.toUpperCase());


// Promises

var path = require('path');
var fs = require('fs');
var request = require('request');
var fsp = require('fs.promised');
var requestp = require('request-promise');

// Imperativo

fs.readFile(path.resolve(__dirname, 'config.json'), function(err, data) {
    if (err) {
        console.log('Something went wrong', err);
        return;
    }

    var config = JSON.parse(data);

    request(config.targetUrl, function(err, response, body) {
        if (err) {
            console.log('Something went wrong', err);
            return;
        }

        fs.writeFile(path.resolve(__dirname, 'target.txt'), body, function(err) {
            if (err) {
                console.log('Something went wrong', err);
                return;
            }

            console.log('Success');
        });
    });
});

// Funcional

fsp.readFile(path.resolve(__dirname, 'config.json'))
    .then(x => JSON.parse(x))
    .then(x => requestp(x.targetUrl))
    .then(x => fsp.writeFile(path.resolve(__dirname, 'target.txt'), x))
    .then(() => console.log.bind(console, 'Success'), (err) => console.log.bind(console, 'Something went wrong', err));
