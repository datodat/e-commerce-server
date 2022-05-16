const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: String,
  processor: String,
  camera: String,
  battery: String,
  price: Number,
  img: String,
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;