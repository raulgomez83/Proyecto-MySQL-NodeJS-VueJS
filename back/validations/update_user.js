const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const usernameSchema = Joi.string()
  .min(2)
  .max(20)
  .error(generateError('UserName field must have between 2 and 20 types', 400));

const updateUserSchema = Joi.object().keys({
  firstname: Joi.string()
    .max(50)
    .error(
      generateError('Firstname field must have between 2 and 50 types', 400)
    ),
  surname: Joi.string()
    .max(50)
    .min(2)
    .error(
      generateError('surname field must have between 2 and 50 types', 400)
    ),
  email: Joi.string().email().error(generateError('Email not valid', 400)),
  birthdate: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(generateError('Date is wrong', 400)),

  username: usernameSchema
});
module.exports = {
  updateUserSchema
};
