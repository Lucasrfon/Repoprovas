import joi from "joi";

const newUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref('password'))
});

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default { newUser, user }