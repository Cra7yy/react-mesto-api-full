const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../helpers/jwt');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictingRequestError = require('../errors/conflictingRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({}).then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      res.status(200).send(user);
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('переданы некоректные данные'));
      } else {
        next(err);
      }
    });
};

const postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ data: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('переданы некоректные данные'));
      } else {
        next(err);
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictingRequestError('email занят'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        next(new ForbiddenError('неправильный email или password'));
      }
      return generateToken({ email: user.email });
    })
    .then((token) => {
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const changeUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(200).send(user);
      }
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('переданы некоректные данные'));
      } else {
        next(err);
      }
    });
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else {
        res.status(200).send(user);
      }
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('переданы некоректные данные'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('переданы некоректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUser,
  getUserId,
  postUser,
  changeUserData,
  changeAvatar,
  login,
};
