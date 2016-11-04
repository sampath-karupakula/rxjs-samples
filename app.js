//create function
var bar = null;
var arr = [10, 20, 30, 40]
var button = document.querySelector('button');
var h4 = document.querySelector("h4");
var input = document.querySelector('input');
/*var bar = Rx.Observable.create(function(observer) {
        observer.next('text');
        observer.next('text');
        observer.next('text');
        observer.next('text');
        observer.next('text');
        observer.error(new Error('test error'));
    });

    //of

    bar = Rx.Observable.of(10, 20, 30, 40);


    //fromArray
    bar = Rx.Observable.fromArray(arr);


    //from Promise
    bar = Rx.Observable.fromPromise(fetch('https://null.jsbin.com'));

    //from

    bar = Rx.Observable.from([10, 20, 30, 40]);




bar = Rx.Observable.fromEvent(button, 'click');


function addEventHandler(handler) {
    button.addEventListener('click',handler);
}

function removeEventHandler(handler) {
    button.removeEventListener('click',handler);
}
bar = Rx.Observable.fromEventPattern(addEventHandler, removeEventHandler);


//operators

//empty

bar = Rx.Observable.empty();//calls complete as soon as it loads
//Rx.Observable.create(function(observer){
    observer.complete();
});


//never
bar = Rx.Observable.never();//nothing happens
//Rx.Observable.create(function(observer){
});


//throw
bar = Rx.Observable.throw("some message"); //nothing happens


//interval
bar = Rx.Observable.interval(5000);
//timer
bar = Rx.Observable.timer(3000, 1000);



//multiple operators
bar = Rx.Observable.interval(400).take(9)
    .map(i => parseInt(["1", "1", "foo", "1", "bar", "2", "6", "8", "7", "19", "21"][i]))
    .filter(i => !isNaN(i));

var sub1, sub2;

setTimeout(() => {
    sub1 = bar.subscribe(function(x) {
        console.log(x);
    }, function(e) {
        console.log(e);
    }, function() {
        console.log('done');
    });
}, 1000);


setTimeout(() => {
    sub1.dispose();
}, 5000);

// sub2 = bar.subscribe(function(x) {
//     console.log(x);
// }, function(e) {
//     console.log(e);
// }, function() {
//     console.log('done');
// });



var clickStream = Rx.Observable.fromEvent(button, 'click');

var doubleClick = clickStream //buffer listen to the events and combine them into  form of array
    .buffer(() => clickStream.debounce(300)) //debounce listens to set of events occurs in the given timespan
    .map(arr => arr.length)
    .filter(l => l == 2);
var dbl = doubleClick.subscribe((e) => {
    console.log(e);
    h4.innerHTML = "double clicked";
});

doubleClick.debounce(1000)
    .subscribe(sug => {
        h4.innerHTML = '-';
    });

//switchMap moving from one observer to another.



var range$ = Rx.Observable.range(1, 10);
var interval$ = Rx.Observable.interval(1000);
var input$ = Rx.Observable.fromEvent(input, 'keyup');
var combinde$ = input$.switchMap(range$);

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');

//let count = 0; //wrong way to manage
var stop$ = Rx.Observable.fromEvent(stop, 'click');
const intervalThatStops$ = interval$.takeUntil(stop$);

const inc = (acc) => ({ count: acc.count + 1 });
const reset = (acc) => ({ count: 0 });
const data = { count: 0 };
var start$ = Rx.Observable.fromEvent(start, 'click');
start$.switchMap(intervalThatStops$)
    .mapTo(inc)
    .startWith(data)
    .scan((acc, curr) => curr(acc))
    .subscribe((i) => {

        h4.innerHTML = i.count;
    }); //scan, startWith, takeUntil



//combineLatest
var weight = Rx.Observable.of(70, 72, 76, 79, 75);
var height = Rx.Observable.of(1.76, 1.77, 1.78);

var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
bmi.subscribe(x => console.log(x));


//concat
var weight = Rx.Observable.interval(1000).take(4);
var height = Rx.Observable.range(1,10);
var weight1 = Rx.Observable.of(70, 72, 76, 79, 75);

var result = Rx.Observable.concat(weight, height, weight1);
result.subscribe(x => console.log(x));


//empty

var interval = Rx.Observable.interval(1000);
var result = interval.mergeMap((x) => {
    return x % 2 == 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty();
});

result.subscribe(x => console.log(x));



var clicks = Rx.Observable.fromEvent(document, 'click');
var timer = Rx.Observable.interval(1000).take(10);
var timer1 = Rx.Observable.interval(1000).take(6);
var timer2 = Rx.Observable.interval(1000).take(10);
var clickOrTimer = Rx.Observable.merge(clicks, timer, timer1, timer2, 2)

clickOrTimer.subscribe((x) => console.log(x));



//audit

var clicks = Rx.Observable.fromEvent(document, 'click');

//var result = clicks.audit(ev => Rx.Observable.interval(1000));
var result = clicks.auditTime(4000);
result.subscribe(x => console.log(x));


//buffer, bufferCount,bufferTime
var clicks = Rx.Observable.fromEvent(document, 'click');
var interval = Rx.Observable.interval(1000);

var result = clicks.bufferTime(4000,3000);
result.subscribe(x => console.log(x));


var clicks = Rx.Observable.fromEvent(document, 'click');
var openings = Rx.Observable.interval(1000);

var result = clicks.bufferToggle(openings,x => x % 2? Rx.Observable.interval(500) : Rx.Observable.empty());
result.subscribe(x => console.log(x));


var clicks = Rx.Observable.fromEvent(document, 'click');
var buffers = clicks.bufferWhen(() =>
    Rx.Observable.interval(1000 + Math.random() * 4000)
);

buffers.subscribe(x => console.log(x));


var clicks = Rx.Observable.fromEvent(document, 'click');
var higherOrder = clicks.map(ev =>
    Rx.Observable.interval(Math.random() * 2000).take(3)
);

var firstOrder = higherOrder.map(x => Rx.Observable.interval(x * 100).take(5)).concatAll();

firstOrder.subscribe(x => console.log(x));


var clicks = Rx.Observable.fromEvent(document, 'click');
var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
result.subscribe(x => console.log(x));


var seconds = Rx.Observable.interval(1000);
var clicks = Rx.Observable.fromEvent(document, 'click');

var secondsBeforeClick = seconds.takeUntil(clicks);
var result = secondsBeforeClick.count();
result.subscribe(x => console.log(x));
var clicks = Rx.Observable.fromEvent(document, 'click');
var result = clicks.debounceTime(1000);
result.subscribe(x => console.log(x));


var clicks = Rx.Observable.fromEvent(document, 'click');
var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
var result = clicksBeforeFive.defaultIfEmpty('no clicks');
result.subscribe(x => console.log(x));

var clicks = Rx.Observable.fromEvent(document, 'click');
var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
delayedClicks.subscribe(x => console.log(x));
var clicks = Rx.Observable.fromEvent(document, 'click');
var interval = Rx.Observable.interval(Math.random() * 5000).take(10);
var delayedClicks = interval.delayWhen(i =>
    clicks);
delayedClicks.subscribe(x => console.log(x));


var range = Rx.Observable.of(1, 2, 2, 3, 4, 5, 6,9, 8, 9, 6, 4, 3, 1).distinct();
range.subscribe(x => console.log(x));

var interval = Rx.Observable.interval(100)
    .every(i => i % 2 === 0).take(10);
interval.subscribe(x => console.log(x));

var letters = Rx.Observable.of('a', 'b', 'c');
var result = letters.mergeMap(x =>
    Rx.Observable.interval(1000).take(3).map(i => x + i)
);
result.subscribe(x => console.log(x));

var clicks = Rx.Observable.fromEvent(document, 'click');
var result = clicks.mergeMapTo(Rx.Observable.interval(1000).take(10));
result.subscribe(x => console.log(x));
*/

var clicks = Rx.Observable.fromEvent(document, 'click');
var tagNames = clicks.pluck('target', 'tagName');
tagNames.subscribe(x => console.log(x));

/*
combinde$.map(i => { let number = parseInt(input.value); return ` ${number} * ${i} = ${number * i} <br>` })
    .subscribe(sug => h4.innerHTML += sug);
clickStream
    .subscribe(sug => {
        h4.innerHTML = "";
        number = parseInt(input.value);
        if (!isNaN(number))
            Rx.Observable.range(1, 10)
            .map(i => { return ` ${number} * ${i} = ${number * i} <br>` })
            .subscribe(sug => h4.innerHTML += sug);
    });
*/