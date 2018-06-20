var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, max: 20 },
  password: { type: String, required: true, max: 50 },
  email: { type: String, required: true, max: 100 },
  timecreated: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
