import Joi from "joi";

export const UserJoi = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    identityNumber: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});