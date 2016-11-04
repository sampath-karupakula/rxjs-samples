//create function
var bar = null;
var arr = [10, 20, 30, 40]
var button = document.querySelector('button');
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


*/
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