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
  return {
    root: root,
  };
}

/*









*/

const array = [4, 6, 2, 5, 3, 7, 8, 2, 12, 4, 6, 73];
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
