const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  mentorid: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("student", UserModel);
