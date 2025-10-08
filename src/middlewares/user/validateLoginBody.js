const Joi = require("joi");

const validateLoginBody = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string()
      .trim()
      .required()
      .messages({
        "any.required": "O nome de usuário é obrigatório",
        "string.empty": "O nome de usuário não pode estar vazio",
      }),
    password: Joi.string()
      .required()
      .messages({
        "any.required": "A senha é obrigatória",
        "string.empty": "A senha não pode estar vazia",
      }),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
       error: "Validação falhou",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = validateLoginBody;
