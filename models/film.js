const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'khalid'
  },
  description: {
    type: String,
    default: 'khalid'
  },
  productImage: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Film', filmSchema)