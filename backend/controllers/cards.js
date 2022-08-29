const Card = require('../models/card');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({}).then((cards) => res.status(200).send(cards))
    .catch(next);
};

const postCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ owner, name, link }).then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некоректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Попытка удалить чужую карточку'));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send(card));
      }
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else {
      res.status(200).send(card);
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некоректные данные'));
    } else {
      next(err);
    }
  });
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    } else {
      res.status(200).send(card);
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некоректные данные'));
    } else {
      next(err);
    }
  });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
