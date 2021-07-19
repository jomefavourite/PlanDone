const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    require: true,
  },
  urlName: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
