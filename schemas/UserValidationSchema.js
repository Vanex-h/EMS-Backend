const joi = require('joi');

const CreateUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(4),
});

module.exports = {
    CreateUser,
}