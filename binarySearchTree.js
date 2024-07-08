function node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function tree(array) {
  let newArray = cleanArray(array);

  return {
    root: function () {
      return buildTree(newArray, 0, newArray.length - 1);
    },
  };
}

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);

  let root = node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);
  return root;
}

function cleanArray(array) {
  let newArray = [...new Set(array)];
  let sortedArray = mergeSort(newArray);
  return sortedArray;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let mid = Math.floor(array.length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid, array.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);
}

function merge(left, right) {
  let mergedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      mergedArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      mergedArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return mergedArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let prettyArray = tree(array);

prettyPrint(prettyArray.root());
