import { body } from 'express-validator';

export const registerValidation = [
  body('lastName', 'Фамилия должна состоять минимум из двух букв!').isLength({ min: 2 }),
  body('firstName', 'Имя должно состоять минимум из двух букв!').isLength({ min: 2 }),
  body('avatarUrl', 'Неверная ссылка на аватарку!').optional().isURL(),
  body('email', 'Неверный формат почты!').isEmail(),
  body('password', 'Пароль должен состоять минимум из пяти символов!').isLength({ min: 5 }),
];