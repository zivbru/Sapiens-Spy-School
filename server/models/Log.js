const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = Log = mongoose.model('logs', logSchema);
