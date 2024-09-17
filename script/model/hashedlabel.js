const mongoose = require('mongoose');

// Define schema for your data
const schema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  }
},{ timestamps: true });

const hashedSchema = mongoose.model('hashed', schema);
module.exports = { hashedSchema };