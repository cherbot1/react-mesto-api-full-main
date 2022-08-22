const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);

const celebrateParams = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .hex()
      .length(24),
  }),
};

router.delete('/:cardId', celebrate(celebrateParams), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(30),
    link: Joi.string()
      .required()
      .pattern(/^http(s)?:\/\/(w{3}\.)?([da-z\-]+\.)+([\w#!:.?+=&%\-])?/),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate(celebrateParams), addLike);

router.delete('/:cardId/likes', celebrate(celebrateParams), removeLike);

module.exports = router;
