const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transSchema = Schema({
  lloji: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('Transmetuesi', transSchema);
