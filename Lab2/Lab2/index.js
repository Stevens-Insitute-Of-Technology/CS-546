const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Average Tests
try {
  // Should Pass
  const averageOne = arrayUtils.average([
    [1, 3],
    [2, 4, 5],
  ]);
  console.log("Average passed successfully");
} catch (e) {
  console.error("Average failed test case");
}
try {
  // Should Fail
  const averageTwo = arrayUtils.average([
    [1, 3],
    ["hi", 4, 5],
  ]);
  console.error("Average did not error");
} catch (e) {
  console.log("Average failed successfully");
}

// modeSquared Tests
try {
  // Should Pass
  const modeSquaredOne = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
  console.log("modeSquared passed successfully");
} catch (e) {
  console.error("modeSquared failed test case");
}
try {
  // Should Fail
  const modeSquaredTwo = arrayUtils.modeSquared(["guitar", 1, 3, "apple"]);
  console.error("modeSquared did not error");
} catch (e) {
  console.log("modeSquared failed successfully");
}

// medianElement Tests
try {
  // Should Pass
  const medianElementOne = arrayUtils.medianElement([1, 1, 1, 1, 1, 1]);
  console.log("medianElement passed successfully");
} catch (e) {
  console.error("medianElement failed test case");
}
try {
  // Should Fail
  const medianElementTwo = arrayUtils.medianElement(5, 6, 7);
  console.error("medianElement did not error");
} catch (e) {
  console.log("medianElement failed successfully");
}

// merge Tests
try {
  // Should Pass
  const mergeOne = arrayUtils.merge(["A", "B", "a"], [1, 2, "Z"]);
  console.log("merge passed successfully");
} catch (e) {
  console.error("merge failed test case");
}
try {
  // Should Fail
  const mergeTwo = arrayUtils.merge([], ["ab", "ts"]);
  console.error("merge did not error");
} catch (e) {
  console.log("merge failed successfully");
}

// sortString Tests
try {
  // Should Pass
  const sortStringOne = stringUtils.sortString("siddharthGuLati 100698 ");
  console.log("sortString passed successfully");
} catch (e) {
  console.error("sortString failed test case");
}
try {
  // Should Fail
  const sortStringTwo = stringUtils.sortString(["Hello", "World"]);
  console.error("sortString did not error");
} catch (e) {
  console.log("sortString failed successfully");
}

// replaceChar Tests
try {
  // Should Pass
  const replaceCharTwo = stringUtils.replaceChar("Daddy", 2);
  console.log("replaceChar passed successfully");
} catch (e) {
  console.error("replaceChar failed test case");
}
try {
  // Should Fail
  const replaceCharTwo = stringUtils.replaceChar(123);
  console.error("replaceChar did not error");
} catch (e) {
  console.log("replaceChar failed successfully");
}

// mashUp Tests
try {
  // Should Pass
  const mashUpOne = stringUtils.mashUp("Hi", "There", "@");
  console.log("mashUp passed successfully");
} catch (e) {
  console.error("mashUp failed test case");
}
try {
  // Should Fail
  const mashUpTwo = stringUtils.mashUp("John");
  console.error("mashUp did not error");
} catch (e) {
  console.log("mashUp failed successfully");
}

// computeObjects Tests
try {
  // Should Pass
  const first = { x: 2, y: 3 };
  const second = { a: 70, x: 4, z: 5 };
  const third = { x: 0, y: 9, q: 10 };
  const fourth = { x: "0", y: 9, q: 10 };
  const computeObjectsOne = objUtils.computeObjects(
    [first, second],
    (x) => x * 2
  );
  console.log("computeObjects passed successfully");
} catch (e) {
  console.error("computeObjects failed test case");
}
try {
  // Should Fail
  const first = { x: 2, y: 3 };
  const fourth = { x: "0", y: 9, q: 10 };
  const computeObjectsTwo = objUtils.computeObjects(
    [first, fourth],
    (x) => x * 2
  );
  console.error("computeObjects did not error");
} catch (e) {
  console.log("computeObjects failed successfully");
}

// commonKeys Tests
try {
  // Should Pass
  const first = { a: 2, b: 4 };
  const second = { a: 5, b: 4 };
  const third = { a: 2, b: { x: 7 } };
  const fourth = { a: 3, b: { x: 7, y: 10 } };
  const commonKeysOne = objUtils.commonKeys(third, fourth);
  console.log("commonKeys passed successfully");
} catch (e) {
  console.error("commonKeys failed test case");
}
try {
  // Should Fail
  const oneArr = [1, 2, 3];
  const commonKeysTwo = objUtils.commonKeys(oneArr, oneArr);
  console.error("commonKeys did not error");
} catch (e) {
  console.log("commonKeys failed successfully");
}

// flipObject Tests
try {
  // Should Pass
  const flipObjectOne = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
  console.log("flipObject passed successfully");
} catch (e) {
  console.error("flipObject failed test case");
}
try {
  // Should Fail
  const flipObjectTwo = objUtils.flipObject({});
  console.error("flipObject did not error");
} catch (e) {
  console.log("flipObject failed successfully");
}
