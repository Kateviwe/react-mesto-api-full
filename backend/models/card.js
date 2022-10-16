const mongoose = require('mongoose');
const { regExpUrl } = require('../middlewares/validation');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regExpUrl.test(link);
      },
      message: 'Ссылка невалидна',
    },
  },
  owner: {
    // Mongo автоматически создаёт поле _id для каждого документа. Так можно связать 2 документа.
    // На уровне схемы: полю следует установить тип: mongoose.Schema.Types.ObjectId, а
    // также свойство ref (имя модели, на которую мы ссылаемся)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // Структура [{...}], так как это массив лайков
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Создание модели по схеме, экспорт
module.exports = mongoose.model('card', cardSchema);
