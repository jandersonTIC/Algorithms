class Tree {
    constructor(content = null, father = null, left = null, right = null) {
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

const d = new Tree("D");
const e = new Tree("E", d);
const c = new Tree("C", d);
const b = new Tree("B", c);
const a = new Tree("A", c);
c.left = a;
c.right = b;
d.left = c;
d.right = e;

console.log(d);
console.log(rightRotation(d));
console.log(d);
