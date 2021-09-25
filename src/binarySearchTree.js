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

//         D               C
//        / \             / \
//       C   E           A   D
//      / \                 / \
//     A   B               B   E
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

//       6              8
//      / \            / \
//     5   8          6   9
//        / \        / \
//       7   9      5   7
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
//      /   \
//     4     7
//    /    /
//   1     6
//    \
//     3
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

let tree = insert(new Node(5, "Five"), null);
insert(new Node(4, "Four"), tree);
insert(new Node(7, "Seven"), tree);
insert(new Node(6, "Six"), tree);
insert(new Node(1, "One"), tree);
insert(new Node(3, "Three"), tree);

console.log(treeHeight(tree));
console.log(tree);
console.log(search(2, tree));
console.log(search(6, tree));

//console.log(rightRotation(d));
//console.log(d);
