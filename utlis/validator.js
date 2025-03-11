import Joi from 'joi'

export const userSignUp = Joi.object({
    userName:  Joi.string().required(),
    email:     Joi.string().email().required(),
    password:  Joi.string().required()
})

export const userLogin = Joi.object({
    email:    Joi.string().email().required(),
    password: Joi.string().required()
})

export const testSchema = Joi.object({
    testName:          Joi.string().required(),
    testDescription:   Joi.string().required(),
    difficulty:        Joi.string().valid("easy", "medium", "hard").required(),
    numOfQuestions:    Joi.number().required(),
    duration:          Joi.number().required(),
    accuracy:          Joi.number().required(),
    completeness:      Joi.number().required(),
    explanation:       Joi.number().required(),
    practicalRelevance:Joi.number().required(),
    conciseness:       Joi.number().required(),
    score:             Joi.number().required()
})

export const submissionSchema = Joi.object({
    testId: Joi.number().required(),
    userId: Joi.number().required(),
    startedAt: Joi.date().required()
})