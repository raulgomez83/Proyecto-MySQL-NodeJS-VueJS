const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const {
  generateError
} = require('../helpers');

const usernameSchema = Joi.string()
  .min(2)
  .max(20)
  .required()
  .error(generateError('UserName field must have between 2 and 20 types', 400));
const passwordSchema = Joi.string()
  .min(6)
  .max(150)
  .required()
  .error(generateError('Field must have between 6 and 50 types', 400));

const newUserSchema = Joi.object().keys({
  firstname: Joi.string()
    .max(50)
    .required()
    .error(
      generateError('Firstname field must have between 2 and 50 types', 400)
    ),
  surname: Joi.string()
    .max(50)
    .min(2)
    .required()
    .error(
      generateError('surname field must have between 2 and 50 types', 400)
    ),
  email: Joi.string()
    .email()
    .required()
    .error(generateError('Email not valid', 400)),
  birthdate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .required()
    .error(generateError('Date is wrong', 400)),

  username: usernameSchema,
  user_password: passwordSchema
});
module.exports = {
  passwordSchema,
  newUserSchema
};