// Создадим роутер
const router = require('express').Router();

const {
  postNewCardValidation,
  defineCardIdValidation,
} = require('../middlewares/validation');

const {
  getAllCards,
  deleteNecessaryCard,
  postNewCard,
  putLikeToCard,
  deleteLikeOfCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.delete('/cards/:cardId', defineCardIdValidation, deleteNecessaryCard);
router.post('/cards', postNewCardValidation, postNewCard);
router.put('/cards/:cardId/likes', defineCardIdValidation, putLikeToCard);
router.delete('/cards/:cardId/likes', defineCardIdValidation, deleteLikeOfCard);

module.exports = router;
