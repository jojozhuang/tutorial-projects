var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  uniquename: { type: String, required: true, max: 100 }, // auto generated based on title
  sequence: { type: Number, required: true },
  title: { type: String, required: true, max: 50 },
  description: { type: String, required: true },
  mainfunction: { type: String, required: true },
  difficulty: { type: Number, required: true }, // 10: easy, 20: medium, 30: hard
  frequency: { type: Number, required: true },
  rating: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model("Question", QuestionSchema);