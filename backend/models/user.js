const mongoose = require('mongoose');
const validator = require('validator');
const { regexUrl } = require('../utils/utils');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: [2, 'Минимальная длина поля - 2 символа'],
      maxLength: [30, 'Максимальная длина поля - 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: regexUrl,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле "Электронная почта" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
