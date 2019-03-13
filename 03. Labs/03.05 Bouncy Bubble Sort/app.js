//Anthony Rusignuolo, Michael Macari, Jon Lalfuer
//Bouncy Bubble Sort Lab

var swapped, end, i, j;
var arr = [];
for (var a = 0; a < 6; a++){
    arr[a] = Math.floor((Math.random() * 10) + 1);
}

console.log(arr);

var bubbleSort = function(arr){
    end = j = arr.length - 1;
    i = 0;
    do {
        swapped = false;
        for (i=0; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        console.log(i);
        end--;
    }
    while(swapped);
    return arr
};

//console.log(bubbleSort(arr));

var start,stop;

var bouncyBubbleSort = function(arr){
    i = 0
    start = 0
    stop = arr.length - 1;
    do {
        swapped = false;
        if (i < stop) {
            for (i = 0; i < stop; i++) {
                if (arr[i] > arr[i + 1]) {
                    var temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            stop--
        }
        if (i >= stop + 1 && swapped === true){
            for (i = stop; i > start; i--) {
                if (arr[i] < arr[i - 1]) {
                    var temp = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                    swapped = true;
                }
            }
            start--
        }
    }
    while(swapped);
    return arr
};

console.log(bouncyBubbleSort(arr));