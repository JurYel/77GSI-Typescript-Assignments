"use strict";
const shiftZeros = (arr) => {
    const nonZeroes = arr.filter(item => item !== 0); // Filter out all non-zero elements
    const zeroes = arr.filter(item => item === 0); // Filter out all zeroes
    return nonZeroes.concat(zeroes); // Concatenate non-zeroes and zeroes
};
const zeroArray = [0, '0', 'initial', null, 0, 'abc', 323];
const zeroArray1 = [false, 1, 0, 1, 2, 0, 1, 3, "a"];
const zeroArray2 = [1, 0, 2, 0, 3, "a", 0, "b", false];
const zeroArray3 = [true, false, 0, 1, 0, 2];
const zeroArray4 = [5, "hello", 0, '0', true, null, 42];
// Example 1
console.log("array1: ", zeroArray);
console.log("shifted array1: ", shiftZeros(zeroArray));
// Example 2
console.log("array2: ", zeroArray1);
console.log("shifted array2: ", shiftZeros(zeroArray1));
// Example 3
console.log("array3: ", zeroArray2);
console.log("shifted array3: ", shiftZeros(zeroArray2));
// Example 4
console.log("array4: ", zeroArray3);
console.log("shifted array4: ", shiftZeros(zeroArray3));
// Example 5
console.log("array5: ", zeroArray4);
console.log("shifted array5: ", shiftZeros(zeroArray4));
