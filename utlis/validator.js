import Joi from 'joi'

export const userSignUp = Joi.object({
    name:      Joi.string().alphanum().required(),
    email:     Joi.string().email().required(),
    password:  Joi.string().required()
})
