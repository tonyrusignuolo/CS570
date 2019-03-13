//Anthony Rusignuolo, Michael Macari, Jon Lafleur
//Bouncy Bubble Sort Lab

function bouncyBubbleSort(arr){
    var start = 0;
    var stop = arr.length-1;
    var swapped;
    var temp;
    for(var i = 0; i < arr.length-1; i++){
        swapped = false;
        if(i % 2 === 0){
            for(var j = start; j < stop-1; j++){
                if(arr[j] > arr[j+1]){
                    temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    swapped = true;
                }
            }
            stop--;
        }
        else {
            for(var j = stop; j > start; j--){
                if(arr[j-1] > arr[j]){
                    temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1] = temp;
                    swapped = true;
                }
            }
            start++;
        }
        if(!swapped)
            break;
    }
    return arr;
};

var test_arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted Array:",test_arr);
var sorted_arr = bouncyBubbleSort(test_arr);
console.log("Bouncy Bubble Sorted array:",sorted_arr);