const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let TaskSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  deleted: {type: Boolean, default: false },
  name: {type: String},
  description: {type: String},
  status: {type: String, enum: ['completed', 'running', 'scheduled']},
  taskBy: {type: Schema.Types.ObjectId, ref: 'User'},
  startsFrom: {type: Date},
  endsAt: {type: Date}
});


// Export the model
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
