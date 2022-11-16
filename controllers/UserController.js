import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { validationResult } from 'express-validator';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';
import NewsModel from '../models/News.js';

dayjs.locale('ru');

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      gender: req.body.gender,
      birthday: dayjs(req.body.birthday).format('D MMMM YYYY'),
      email: req.body.email,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d'
      });

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось зарегистрироваться!'
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Не удалось найти пользователя!'
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль!'
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d'
      });

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось авторизоваться!'
    });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Не удалось найти пользователя!'
      });
    }
    const { passwordHash, ...userData } = user._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Нет доступа!'
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить пользователей!'
    });
  }
};
export const update = async (req, res) => {
  try {
    await UserModel.updateOne(
      {
        _id: req.params.id
      },
      {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        gender: req.body.gender,
        birthday: req.body.birthday,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
      }
    );
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить данные!'
    });
  }
};