function getRange(list, target) {
    let firstIndex = binarySearch(list, 0, list.length - 1, target, true);
    let lastIndex = binarySearch(list, 0, list.length - 1, target, false);
    return [firstIndex, lastIndex];
}

function binarySearch(list, low, high, target, findFirst) {
    if (high < low) return -1;

    let middle = Math.floor((high - low) / 2) + low;

    if (findFirst) {
        if (
            (middle === 0 || target > list[middle - 1]) &&
            list[middle] === target
        ) {
            return middle;
        }
        if (target > list[middle]) {
            return binarySearch(list, middle + 1, high, target, findFirst);
        } else {
            return binarySearch(list, low, middle - 1, target, findFirst);
        }
    } else {
        if (
            (middle === list.length - 1 || target < list[middle + 1]) &&
            list[middle] === target
        ) {
            return middle;
        } else if (target < list[middle]) {
            return binarySearch(list, low, middle - 1, target, findFirst);
        } else {
            return binarySearch(list, middle + 1, high, target, findFirst);
        }
    }
}

let list = [1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 13, 15, 15];

console.log(getRange(list, 4));
