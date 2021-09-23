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

const d = new Node(5, "D");
const e = new Node(4, "E", d);
const c = new Node(3, "C", d);
const b = new Node(2, "B", c);
const a = new Node(1, "A", c);
c.left = a;
c.right = b;
d.left = c;
d.right = e;

console.log(d);
console.log(rightRotation(d));
console.log(d);
