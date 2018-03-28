function getArr(count) {
    var arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(0 + Math.floor(Math.random() * (100 - 0 + 1)));
    }
    return arr;
}

function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                array[j] = array[j] + array[j + 1];
                array[j + 1] = array[j] - array[j + 1];
                array[j] = array[j] - array[j + 1];
            }
        }
    }
    return array;
}

function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
        var min = i;
        for (let j = i; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (array[min] == array[i]) {
            //引用第三个变量 则不需要这个break
            //不引用，不加这个判断出现0的情况
            break
        }
        array[min] = array[min] + array[i];
        array[i] = array[min] - array[i];
        array[min] = array[min] - array[i];
    }
    return array;
}

function insertionSort(array) {
    var current;
    for (let i = 0; i < array.length - 1; i++) {
        current = array[i + 1];
        var pre = i;
        while (pre >= 0 && current < array[pre]) {
            array[pre + 1] = array[pre];
            pre--;
        }
        array[pre + 1] = current;
    }
    return array;
}

/**
 * 希尔排序（Shell Sort）
 * @param {*} array 
 */
function sellSort(array) {
    var len = array.length;
    var temp, gap = len / 2;
    while (gap > 0) {
        for (var i = gap; i < len; i++) {
            temp = array[i];
            var preIndex = i - gap;
            while (preIndex >= 0 && temp < array[preIndex]) {
                array[preIndex + gap] = array[preIndex];
                preIndex -= gap;
            }
            array[preIndex + gap] = temp;
        }
        //gap /= 2;
        gap = parseInt(gap / 2);
    }
    return array;
}

/**
 * 归并排序（Merge Sort）
 * @param {*} array 
 */
function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }
    var mid = parseInt(array.length / 2);
    var left = array.slice(0, mid);
    var right = array.slice(mid, array.length);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var len = left.length + right.length;
    var result = new Array(len);
    for (var index = 0, i = 0, j = 0; index < result.length; index++) {
        if (i >= left.length)
            result[index] = right[j++];
        else if (j >= right.length)
            result[index] = left[i++];
        else if (left[i] > right[j])
            result[index] = right[j++];
        else
            result[index] = left[i++];
    }
    return result;
}

/**
 * 快速排序（Quick Sort）
 * @param {*} arr 
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];

    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};

/**
 * 计数排序（Counting Sort）
 * @param {*} array 
 */
function countingSort(array) {
    if (array.length == 0) return array;
    var bias, min = array[0],
        max = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] > max)
            max = array[i];
        if (array[i] < min)
            min = array[i];
    }
    bias = 0 - min;
    var bucket = Array(max - min + 1).fill(0);
    //var bucket = Array.apply(null, Array(max - min + 1)).map(() => 0)
    for (var i = 0; i < array.length; i++) {
        bucket[array[i] + bias]++;
    }
    var index = 0,
        i = 0;
    while (index < array.length) {
        if (bucket[i] == 0) {
            i++;
        } else {
            array[index] = i - bias;
            bucket[i]--;
            index++;
        }
    }
    return array;
}