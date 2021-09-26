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
//     5            
//    / \          
//   4   7        4 aux theBiggest
//  /   /          \
// 1   6       5    7
//  \         /    /
//   3       1    6
//            \ 
//             3 
function removeRotation(tree) {
    let aux = tree.left;
    let theBiggest;
    if (aux.right != null) {
        theBiggest = aux.right;
    } else {
        theBiggest = aux;
    }

    while (theBiggest.right != null) {
        theBiggest = theBiggest.right;
    }
    if (tree.right != null) {
        theBiggest.right = tree.right;
        tree.right.father = theBiggest;
    }
    let theBiggerParent = theBiggest.father
    theBiggest.father = tree.father;
    tree.father = theBiggerParent;

    if (theBiggest.left != null) {
        theBiggest.left.father = tree;
        tree.left = theBiggest.left;
    }

    theBiggest.left
}

//        5
//       / \
//      4   7
//     /   /
//    1   6
//     \
//      3
function remove(target) {
    if (target == null) {
        return target;
    }

    if (target.left == null && target.right == null) {
        let previousNode = target.father;
        if (
            previousNode.left != null &&
            previousNode.left.key == target.key
        ) {
            previousNode.left = null;
        } else {
            previousNode.right = null;
        }
        delete target;
        return null;
    }

    if (target.left != null || target.right != null) {
        if (target.left != null) {
            target.left.father = target.father;
            if (target.father.left !=null && target.father.left.key == target.key) {
                target.father.left = target.left;
            } else {
                target.father.right = target.left;
            }
        } else {
            target.right.father = target.father;
            if (target.father.left !=null && target.father.left.key == target.key) {
                target.father.left = target.right;
            } else {
                target.father.right = target.right;
            }
        }
        return tree;
    }


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

let target = search(1, tree);
console.log(remove(target, tree));

//console.log(rightRotation(d));
//console.log(d);
