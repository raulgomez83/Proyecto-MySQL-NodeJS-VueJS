const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const {
  generateError
} = require('../helpers');
const {
  passwordSchema
} = require('./login');

const reactivateSchema = Joi.object().keys({
  email: Joi.string().email().error(generateError('Email not valid', 400)),
  password: passwordSchema
});
const recoveryPasswordSchema = Joi.object().keys({
  email: Joi.string().email().error(generateError('Email not valid', 400))
});

module.exports = {
  recoveryPasswordSchema,
  reactivateSchema
};