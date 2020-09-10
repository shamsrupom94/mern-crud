const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let UserSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  lastUpdatedAt:{type: Date, default: Date.now},
  deleted: {type: Boolean, default: false },
  name: {type: String},
  email: {type: String},
  password: {type: String},
  theme: {type: String, enum: ['dark', 'light']}
});


// Export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
