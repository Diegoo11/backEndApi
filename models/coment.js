const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon')

const ComentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  date: {type: Date, required: true},
  text: {type: String, required: true},
  message: {type: Schema.Types.ObjectId, ref: 'Message', required: true}
})

ComentSchema.virtual('fecha').get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString();
})

module.exports = mongoose.model('Coment', ComentSchema)