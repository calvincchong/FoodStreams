const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // your code here
  orders: String,
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  shirt: {
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      message: 'Must be a shirt size from XS, S, M, L, XL, XXL'
    }
  },
  skillLevel: {
    type: String,
    enum: {
      values: ['beginner', 'intermediate', 'expert'],
      message: ' aint supported'
    }
  }
});

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;