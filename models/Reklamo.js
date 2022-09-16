const mongoose = require('mongoose');

const reklamaSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    businessCategory: {
      type: String,
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    owner: {
      type: String,
    },
    ownerPhone: {
      type: String,
    },
    businessPhone: {
      type: String,
    },
    businessImage: {
      type: String,
      // required: true,
    },
    businessEmail: {
      type: String,
    },
    website: {
      type: String,
    },
    businessDescription: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    businessLocation: {
      type: String,
    },
    adresa: {
      type: String,
    },
    DATA: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Reklama', reklamaSchema);
