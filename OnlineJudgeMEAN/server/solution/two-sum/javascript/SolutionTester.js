// node SolutionTester.js 1 0 -1 -1
var twoSum = require("./Solution.js");

var args = process.argv.slice(2);
console.log("args: ", args);
var nums = args.slice(0, args.length - 1);
var target = args.slice(args.length - 1);
console.log("nums: ", nums);
console.log("target: ", target);

/*
var twoSum = function(nums, target) {
  var ret = [];
  var exist = {};
  for (var i = 0; i < nums.length; i++) {
    if (typeof exist[target - nums[i]] !== "undefined") {
      ret.push(exist[target - nums[i]]);
      ret.push(i);
    }

    exist[nums[i]] = i;
  }

  return ret;
};*/

var ret = twoSum(nums, target);
console.log(ret);
