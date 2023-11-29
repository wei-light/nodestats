import Joi from 'joi'

export const portSchema = Joi.number().port()

export const ipSchema = Joi.string().ip()
