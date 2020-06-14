const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const scoreSchema = Joi.number()
  .min(1)
  .max(5)
  .integer()
  .required()
  .error(new Error('Field must be a number between 1 and 5 '));
const newRatingSchema = Joi.object().keys({
  score_interest: scoreSchema,
  score_theme_quality: scoreSchema,
  score_design: scoreSchema,
  score_comunication: scoreSchema,
  comments: Joi.string()
    .max(2500)
    .min(3)
    .error(new Error('Field must have between 3 and 2500 types'))
});
module.exports = {
  newRatingSchema
};
