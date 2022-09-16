const mongoose = require('mongoose');
const { db } = require('./models/User');
require('dotenv').config();

const lidhuMeDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    });
    console.log('database u lidh');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = lidhuMeDb;
