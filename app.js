var bar = Rx.Observable.create(function(observer) {
    observer.next('text');
    observer.next('text');
    observer.next('text');
    observer.next('text');
    observer.next('text');
    observer.error(new Error('test error'));
});

bar.subscribe(function(x) {
    console.log(x);
},function(e){
    console.error(e);
});