const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: String,
    },
    phone: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    year: {
      type: String,
    },
    hp: {
      type: Number,
    },
    karburanti: {
      type: String,
    },
    menjachi: {
      type: String,
    },
    kubikazha: {
      type: Number,
    },
    killometrazha: {
      type: String,
    },
    transmetuesi: {
      type: String,
    },
    // DATA: { type: String },
  },
  { timestamps: true }
);
productSchema.index({ name: 'text' });
module.exports = mongoose.model('Product', productSchema);
