const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The field must be filled in'],
      minlength: [2, 'The field must be between 2 and 30 characters long'],
      maxlength: [30, 'The field must be between 2 and 30 characters long'],
      // default: 'Имя',
    },

    email: {
      type: String,
      required: [true, 'The field must be filled in'],
      unique: true,
      validate: {
        validator: (data) => validator.isEmail(data),
        message: 'Введите валидный e-mail',
      },
    },

    password: {
      type: String,
      required: [true, 'The field must be filled in'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
