const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generateError } = require('../helpers');

const updatePresentationSchema = Joi.object().keys({
  title: Joi.string()
    .max(150)
    .error(generateError('Maximum types per field title is 150', 400)),
  presentation_event: Joi.string()
    .max(150)
    .error(
      generateError('Maximum types per field  presentation_event is 150', 400)
    ),
  presentation_date: Joi.date()
    .format('YYYY-MM-DD')
    .utc()
    .error(generateError('Date is wrong', 400)),
  city: Joi.string()
    .max(100)
    .error(generateError('Maximum types per field city is 100', 400)),
  category: Joi.string()
    .max(100)
    .error(generateError('Maximum types per field category  is 100', 400)),
  presentation_language: Joi.string()
    .max(100)
    .error(generateError('Maximum types per field language  is 100', 400)),

  video: Joi.string().error(generateError('muy mal', 400))
});
module.exports = { updatePresentationSchema };
