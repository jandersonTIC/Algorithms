class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function addTwoNumbers(firstList, secondList) {
    return addTwoNumbersHelper(firstList, secondList, 0);
}

/**
 *
 * @param {*} firstList 3 => 5 => 7
 * @param {*} secondList 2 => 4 => 6
 * @param {*} carryOver 0
 */

function addTwoNumbersHelper(firstList, secondList, carryOver) {
    let value = firstList.value + secondList.value + carryOver;
    carryOver = Math.floor(value / 10);
    let resultNode = new Node(value % 10);

    if (firstList.next != null || secondList.next != null) {
        if (firstList.next === null) {
            firstList.next = new Node(0);
        }
        if (secondList.next === null) {
            secondList.next = new Node(0);
        }
        resultNode.next = addTwoNumbersHelper(
            firstList.next,
            secondList.next,
            carryOver
        );
    } else if (carryOver > 0) {
        resultNode.next = new Node(carryOver);
    }
    return resultNode;
}

let listOne = new Node(3);
listOne.next = new Node(5);
listOne.next.next = new Node(7);

let listTwo = new Node(2);
listTwo.next = new Node(4);
listTwo.next.next = new Node(6);

let result = addTwoNumbers(listOne, listTwo);

while (result !== null) {
    console.log(result.value, "\t");
    result = result.next;
}
