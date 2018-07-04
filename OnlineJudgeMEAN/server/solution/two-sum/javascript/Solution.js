var twoSum = function(nums, target) {
  var ret = [];
  var exist = {};
  for (var i = 0; i < nums.length; i++) {
    if (typeof exist[target - nums[i]] !== "undefined") {
      ret.push(exist[target - nums[i]]);
      ret.push(i + 1);
    }

    exist[nums[i]] = i + 1;
  }

  return ret;
};

//module.exports = twoSum;
