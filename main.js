class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
           then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    height() {

        // if (this.parent === null) {
        //     return 0;
        // }

        let height = 0;
        function countHeight(node) {
            if (node.left === null && node.right === null) {
                return;
            }
            if (node.right !== null) {
                countHeight(node.right);
            }
            if (node.left !== null) {
                countHeight(node.left);
            }
            height++;

        }

        countHeight(this);
        return height;
        // if (tree.parent === "null") {
        //     return 0;
        // }

        // return 1 + Math.max(this.height(tree.left), this.height(tree.right));

        // let countLeft = 0;
        // let countRight = 0;

        // while (this.left !== "null") {
        //     for (let i = 0; i < this.next; i++) {
        //         countLeft++
        //         let currNode = this.next
        //     }
        // }

        // while (this.right !== "null") {
        //     for (let i = 0; i < this.next; i++) {
        //         countRight++
        //         let currNode = this.next
        //     }
        // }

        // let total = countLeft + countRight;

        // //while this.left, this.right is not null then go and count. Then currNode = this.left, currNode = this.right
        // return total;

    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}


const newBinaryTree = new BinarySearchTree();
newBinaryTree.insert(3);
newBinaryTree.insert(1);
newBinaryTree.insert(4);
newBinaryTree.insert(6);
newBinaryTree.insert(9);
newBinaryTree.insert(2);
newBinaryTree.insert(5);
newBinaryTree.insert(7);
console.log(newBinaryTree);

const secondBinaryTree = new BinarySearchTree();
secondBinaryTree.insert("E");
secondBinaryTree.insert("A");
secondBinaryTree.insert("S");
secondBinaryTree.insert("Y");
secondBinaryTree.insert("Q");
secondBinaryTree.insert("U");
secondBinaryTree.insert("E");
secondBinaryTree.insert("S");
secondBinaryTree.insert("T");
secondBinaryTree.insert("I");
secondBinaryTree.insert("O");
secondBinaryTree.insert("N");
// console.log(secondBinaryTree);

//The tree() function returns 0 if the passed in Binary Search Tree is empty. 
//Otherwise it returns the key of t left branch and adds it to the t.value and 
//adds that to the t right branch
function tree(t) {
    if (!t) { //O(n)
        return 0; //O(n)
    }
    return tree(t.left) + t.value + tree(t.right) //O(n)
}
//O(n^2)

// console.log(tree(newBinaryTree));

console.log(newBinaryTree.height());