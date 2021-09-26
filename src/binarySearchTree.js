class Node {
    constructor(
        key = null,
        content = null,
        father = null,
        left = null,
        right = null
    ) {
        this.key = key;
        this.content = content;
        this.father = father;
        this.left = left;
        this.right = right;
    }
}
//        5           4
//       / \         / \
//      4   7       1   5
//     /   /         \   \
//    1   6           3   7
//     \                 / 
//      3               6 
function rightRotation(tree) {
    let aux = tree.left;
    tree.left = aux.right;
    if (aux.right != null) {
        aux.right.father = tree;
    }
    aux.right = tree;
    tree.father = aux;
    return aux;
}

//     5            7
//    / \          /
//   4   7        5
//  /   /        / \
// 1   6        4   6
//  \          /
//   3        1
//             \
//              3
function leftRotation(tree) {
    let aux = tree.right;
    tree.rigth = aux.left;
    if (aux.left != null) aux.left.father = tree;
    aux.left = tree;
    tree.father = aux;
    return aux;
}

function treeHeight(tree) {
    let leftHeight = 0;
    let rightHeight = 0;

    if (tree == null) {
        return -1;
    }
    leftHeight = treeHeight(tree.left);
    rightHeight = treeHeight(tree.right);

    if (leftHeight > rightHeight) {
        return leftHeight + 1;
    }

    return rightHeight + 1;
}
//        5
//       / \
//      4   7
//     /   /
//    1   6
//     \
//      3
function insert(node, tree) {
    if (node == null || tree == null) {
        return node;
    }

    if (node.key <= tree.key) {
        tree.left = insert(node, tree.left);
        tree.left.father = tree;
        return tree;
    } else if (node.key > tree.key) {
        tree.right = insert(node, tree.right);
        tree.right.father = tree;
    }
    return tree;
}
//time O(height) => O(log n), space O(n)
function search(wantedKey, tree) {
    if (tree == null) {
        return tree;
    }

    if (wantedKey == tree.key) {
        return tree;
    }

    if (wantedKey < tree.key) {
        return search(wantedKey, tree.left);
    } else if (wantedKey > tree.key) {
        return search(wantedKey, tree.right);
    }
}

function theBiggestKey(tree) {
    let theBiggest = tree;
    while (theBiggest.right != null) {
        theBiggest = theBiggest.right;
    }
    return theBiggest;
}


function remove(targetKey, tree) {
    let target = search(targetKey, tree);

    if (target === null) return tree;

    let father = target.father;
    let subtree = removeHelper(target);

    if (father === null) return subtree;
    
    if (father.left === target) {
        father.left = subtree;
    }

    if (father.right === target) {
        father.right = subtree;
    }
    
    return tree;
}

function removeHelper(target) {
    let aux, p;

    if (target.left == null && target.right == null) {
        delete target;
        return null;
    }

    if (target.left == null || target.right == null) {
        if (target.left == null) {
            aux = target.right;
        } else {
            aux = target.left;
        }
        aux.father = target.father;
        delete target;
        return aux;
    }

    aux = theBiggestKey(target.left);
    target.key = aux.key;
    target.content = aux.content;
    p = aux.father;
    if (p == target) {
        p.left = removeHelper(aux);
    } else {
        p.right = removeHelper(aux);
    }
    return target;
}

let tree = insert(new Node(5, "Five"), null);
insert(new Node(4, "Four"), tree);
insert(new Node(7, "Seven"), tree);
insert(new Node(6, "Six"), tree);
insert(new Node(1, "One"), tree);
insert(new Node(3, "Three"), tree);

console.log(treeHeight(tree));
console.log(tree);
console.log(search(3, tree));
console.log(search(6, tree));
console.log(search(3, tree));

//     5            
//    / \          
//   4   7        4 
//  /   /       /   \
// 1   6       1     7
//  \           \   /
//   3           3 6
console.log(remove(5, tree));
