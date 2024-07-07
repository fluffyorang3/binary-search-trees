function node(data = null, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function tree(array) {
  function buildTree(array) {
    let newArray = [...new Set(array)];
    let sortedArray = mergeSort(newArray);

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
  }
}
