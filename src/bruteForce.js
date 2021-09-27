function permuteHelper(list, start = 0) {
    if (start === list.length - 1) {
        return [...list];
    }

    let result = [];
    let i = start;

    for (; i < list.length; i++) {
        let aux = list[start];
        list[start] = list[i];
        list[i] = aux;
        result.push(permuteHelper(list, start + 1));
        aux = list[start];
        list[start] = list[i];
        list[i] = aux;
    }
    return result;
}

function permute(list) {
    return permuteHelper(list);
}

console.log(permute([1, 2, 3]));
