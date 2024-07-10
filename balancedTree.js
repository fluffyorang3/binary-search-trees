import { merge, mergeSort } from "./mergeSort.js";

function node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function tree(array) {
  function arrayCleaner() {
    array = mergeSort(array);
    array = [...new Set(array)];
  }
  arrayCleaner(array);

  let root = buildTree(array, 0, array.length - 1);

  function buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let newNode = node(array[mid]);

    newNode.left = buildTree(array, start, mid - 1);
    newNode.right = buildTree(array, mid + 1, end);
    return newNode;
  }

  function insert(value) {
    let newNode = node(value);

    if (root === null) {
      root = newNode;
      return;
    }
    let currentNode = root;
    let parentNode = null;

    while (currentNode !== null) {
      parentNode = currentNode;
      if (currentNode.data === value) {
        return;
      } else if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    if (parentNode.data > value) {
      parentNode.left = newNode;
    }
    if (parentNode.data < value) {
      parentNode.right = newNode;
    }
  }

  function deleteItem() {
    let currentNode = root;
    let parentNode = null;

    if (root === null) {
      console.log("Nothing to delete");
      return;
    }

    while (currentNode.data !== value) {
      if (currentNode.data > value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.data < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        console.log("The value doesn't exist in the tree");
        return;
      }
    }
    //leaf node deletion
    if (currentNode.left === null && currentNode.right === null) {
      if (currentNode.data > parentNode.data) {
        currentNode = null;
        parentNode.right = null;
      } else {
        currentNode = null;
        parentNode.left = null;
      }
    }

    if (
      (currentNode.left === null && currentNode.right !== null) ||
      (currentNode.left !== null && currentNode.right === null)
    ) {
    }
  }
  return {
    root: root,
    insert: insert,
  };
}

/*









*/

const array = [2, 6, 4, 1, 3, 0, 9, 3, 65, 16, 6];
const bst = tree(array);
const rooty = bst.root;

const prettyPrint = (rooty, prefix = "", isLeft = true) => {
  if (rooty === null) {
    return;
  }
  if (rooty.right !== null) {
    prettyPrint(rooty.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${rooty.data}`);
  if (rooty.left !== null) {
    prettyPrint(rooty.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(rooty);

bst.insert(9);
prettyPrint(rooty);
bst.insert(5);
prettyPrint(rooty);
bst.insert(10);
prettyPrint(rooty);
bst.insert(0);
prettyPrint(rooty);
bst.insert(0);
prettyPrint(rooty);
bst.insert(0);
prettyPrint(rooty);
