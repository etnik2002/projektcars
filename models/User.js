const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      minlength: 9,
      maxLength: 9,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    userRole: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    vendbanimi: {
      type: 'String',
    },
    notification: {
      type: String,
    },
    wishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model('User', userSchema);
