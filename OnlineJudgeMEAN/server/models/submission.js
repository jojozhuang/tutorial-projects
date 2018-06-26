var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  questionname: { type: String, required: true, max: 100 },
  solution: { type: String, required: true },
  status: { type: Number, required: true } // -1: not submitted, 0: pass, 1: fail, 2: partially pass
});

// Export the model
module.exports = mongoose.model("Submission", SubmissionSchema);
