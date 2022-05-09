const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon')

const MessageSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  date: {type: Date, required: true},
  text: {type: String, required: true},
  title: {type: String, required: true}
})

MessageSchema
.virtual('fecha')
.get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString();
})

module.exports = mongoose.model('Message', MessageSchema);