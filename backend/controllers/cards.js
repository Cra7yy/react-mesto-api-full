const Card = require('../models/card');

const InvalidData = () => {
  const error = new Error('Переданы некоректные данные');
  error.statusCode = 400;
  throw error;
};

const ErrCardId = () => {
  const error = new Error('Карточка с указанным _id не найдена');
  error.statusCode = 404;
  throw error;
};

const ForeignCard = () => {
  const error = new Error('Попытка удалить чужую карточку');
  error.statusCode = 403;
  throw error;
};

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
        throw new InvalidData();
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      ErrCardId();
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForeignCard());
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
      throw new ErrCardId();
    } else {
      res.status(200).send(card);
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new InvalidData();
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
      throw new ErrCardId();
    } else {
      res.status(200).send(card);
    }
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new InvalidData();
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
