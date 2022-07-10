const Joi = require('joi');

exports.createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).alphanum().required(),
});

exports.resetPasswordSchema = Joi.object({
    email: Joi.string().email().required().error(() => new Error("El email debe tener el formato de un correo electrónico.")),
    password: Joi.string().min(8).alphanum().required().error(() => new Error("La contraseña debe tener números y letras y al menos 8 dígitos.")),
});

exports.recoverPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

exports.confirmCodeSchema = Joi.object({
    code: Joi.number().integer().min(100000).max(999999).error(() => new Error("El código debe ser un número de 6 dígitos.")),
    email: Joi.string().email().required(),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).alphanum().required(),
});

exports.restaurantCustomSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    filters: Joi.array().items(Joi.string()).required(),
    photo1: Joi.string().required(),
});