const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  topic: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

const Note = mongoose.model('note', noteSchema);
