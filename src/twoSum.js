// O(n^2)
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

console.log(twoSumBruteForce([3, 5, 7], 10));
