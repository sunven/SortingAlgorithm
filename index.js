/**
 * 获取随机数组
 * @param {*} count 
 */
function getArr(count) {
    var arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(0 + Math.floor(Math.random() * (100 - 0 + 1)));
    }
    return arr;
}

/**
 * 冒泡排序（Bubble Sort）
 * @param {*} array 
 */
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

/**
 * 选择排序（Selection Sort）
 * @param {*} array 
 */
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

/**
 * 插入排序（Insertion Sort）
 * @param {*} array 
 */
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

/**
 * 基数排序（Radix Sort）
 * @param {*} array 
 */
function radixSort(array) {
    if (array == null || array.length < 2) {
        return array;
    }
    // 1.先算出最大数的位数；
    var max = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    //获得最大位数
    var maxDigit = 0;
    while (max != 0) {
        max = parseInt(max / 10);
        maxDigit++;
    }
    var mod = 10,
        div = 1;
    var bucketList = [];
    for (var i = 0; i < 10; i++) {
        bucketList.push([]);
    }
    //遍历位数
    for (var i = 0; i < maxDigit; i++, mod *= 10, div *= 10) {
        //依次取个位 十位 百位......
        for (var j = 0; j < array.length; j++) {
            var num = parseInt((array[j] % mod) / div);
            bucketList[num].push(array[j]);
        }
        var index = 0;
        for (var j = 0; j < bucketList.length; j++) {
            for (var k = 0; k < bucketList[j].length; k++) {
                array[index++] = bucketList[j][k];
            }
            bucketList[j].length = 0;
        }
    }
    return array;
}

/**
 * 桶排序（Bucket Sort）
 * @param {*} array 
 */
function bucketSort(array, bucketSize) {
    if (array == null || array.length < 2) {
        return array;
    }
    //每个桶可以放入非重复值的数量
    var bucketSize = bucketSize || 5;
    var max = array[0],
        min = array[0];
    // 找到最大值最小值
    for (var i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
        if (array[i] < min) {
            min = array[i];
        }
    }
    if(max==min){
        return array;
    }
    //桶的个数
    var bucketCount = Math.floor((max - min) / bucketSize) + 1;
    var bucketArr = Array.apply(null, Array(bucketCount)).map(() => new Array());
    var resultArr = [];
    for (var i = 0; i < array.length; i++) {
        bucketArr[Math.floor((array[i] - min) / bucketSize)].push(array[i]);
    }
    for (var i = 0; i < bucketCount; i++) {
        if (bucketCount == 1) {
            bucketSize--;
        }
        var temp = bucketSort(bucketArr[i], bucketSize);
        for (var j = 0; j < temp.length; j++) {
            resultArr.push(temp[j])
        };
    }
    return resultArr;
}

var len;
/**
 * 
 * @param {*} array 
 */
function heapSort(array) {
    len = array.length;
    if (len < 1) {
        return array;
    }
    //1.构建一个最大堆
    buildMaxHeap(array);
    //2.循环将堆首位（最大值）与末位交换，然后在重新调整最大堆
    while (len > 0) {
        swap(array, 0, len - 1);
        len--;
        adjustHeap(array, 0);
    }
    return array;
}

/**
 * 建立最大堆
 * @param {*} array 
 */
function buildMaxHeap(array) {
    //从最后一个非叶子节点开始向上构造最大堆
    for (var i = Math.floor((len - 1) / 2); i >= 0; i--) {
        adjustHeap(array, i);
    }
}

/**
 * 调整使之成为最大堆
 * @param {*} array 
 * @param {*} i 
 */
function adjustHeap(array, i) {
    var maxIndex = i;
    //如果有左子树，且左子树大于父节点，则将最大指针指向左子树
    if (i * 2 < len && array[i * 2] > array[maxIndex]) {
        maxIndex = i * 2;
    }
    //如果有右子树，且右子树大于父节点，则将最大指针指向右子树
    if (i * 2 + 1 < len && array[i * 2 + 1] > array[maxIndex]) {
        maxIndex = i * 2 + 1;
    }
    //如果父节点不是最大值，则将父节点与最大值交换，并且递归调整与父节点交换的位置。
    if (maxIndex != i) {
        swap(array, maxIndex, i);
        adjustHeap(array, maxIndex);
    }
}

/**
 * 交换值
 * @param {*} array 
 * @param {*} i 
 * @param {*} j 
 */
function swap(array, i, j) {
    array[i] = array[i] + array[j];
    array[j] = array[i] - array[j];
    array[i] = array[i] - array[j];
}