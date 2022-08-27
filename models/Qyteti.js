const mongoose = require('mongoose');

const qytetiSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Qytet', qytetiSchema);
