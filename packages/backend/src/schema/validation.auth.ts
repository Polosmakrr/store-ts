import Joi from 'joi';

export const schemaAuth = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(50).trim()
});
