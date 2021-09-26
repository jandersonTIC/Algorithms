const { quickSort } = require("./quicksort");

// time O(n^2), space O(1)
function twoSumBruteForce(list, target) {
    //O(n)
    for (let i = 0; i < list.length - 1; i++) {
        //O(n)
        for (let j = i + 1; j < list.length; j++) {
            //O(1)
            if (list[i] + list[j] == target) {
                //O(1)
                return 1;
            }
        }
    }
    //O(1)
    return 0;
}

//time O(n), space O(n)
function twoSumLinearSmartSearch(list, target) {
    // O(1)
    let j = list.length - 1;
    // O(n) or O(n²) depending on implementation
    list.sort((a, b) => a - b);
    // O(n)
    for (let i = 0; i < list.length; i++) {
        // O(1)
        let complement = target - list[i];
        //O(n)
        for (; j > i; j--) {
            //O(1)
            if (list[j] == complement) {
                //O(1)
                return 1;
            }
        }
    }
    //O(1)
    return 0;
}

//time O(n log n), space O(n)
function twoSumQuickSearch(list, target) {
    // O(1)
    let j = list.length - 1;
    // O(n log n)
    const sorted = quickSort(list, 0, j);
    //O(n)
    for (let i = 0; i < list.length; i++) {
        //O(1)
        let complement = target - sorted[i];
        //O(n)
        for (; j > i; j--) {
            //O(1)
            if (sorted[j] == complement) {
                //O(1)
                return 1;
            }
        }
    }
    //O(1)
    return 0;
}

//Time complexity: O(n), space complexity: O(n)
function twoSumWithDictionary(list, target) {
    //O(1)
    const dictionary = {};
    //O(n)
    for (let i = 0; i < list.length - 1; i++) {
        //O(1)
        const complement = target - list[i];
        //O(1)
        dictionary[complement] = 1;
    }

    //O(n)
    for (let j = list.length; j > 0; j--) {
        //O(1)
        if (dictionary[list[j]]) {
            //O(1)
            return 1;
        }
    }
    //O(1)
    return 0;
}

let target = 1592;
let items = [];
let i = 10000000;

while (items.length < 200000) {
    let value = Math.round(Math.random() * i);
    items.push(value);
    i++;
}

let startedAt = new Date().getTime();
let result1 = twoSumBruteForce(items, target);
let endedAt = new Date().getTime();
console.log(result1, "twoSumBruteForce cost:", endedAt - startedAt);

startedAt = new Date().getTime();
let result2 = twoSumLinearSmartSearch(items, target);
endedAt = new Date().getTime();
console.log(result2, "twoSumLinearSmartSearch cost:", endedAt - startedAt);

startedAt = new Date().getTime();
let result3 = twoSumQuickSearch(items, target);
endedAt = new Date().getTime();
console.log(result3, "twoSumQuickSearch cost:", endedAt - startedAt);

startedAt = new Date().getTime();
let result4 = twoSumWithDictionary(items, target);
endedAt = new Date().getTime();
console.log(result4, "twoSumWithDictionary cost:", endedAt - startedAt);
