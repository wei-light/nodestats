import Joi from 'joi'

export const portSchema = Joi.number().port()

export const ipSchema = Joi.string().ip()

export const integerSchema = Joi.number().integer()

export const clientArraySchema = Joi.array().items(Joi.object({
  token: Joi.string().required(),
  name: Joi.string().required(),
  os: Joi.string().required(),
  location: Joi.string().required(),
}))
