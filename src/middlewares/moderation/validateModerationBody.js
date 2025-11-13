const Joi = require("joi");

const validateModerationBody = (req, res, next) => {
  const schema = Joi.object({
    error_comment: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .max(40)
      .required()
      .messages({
        "any.required": "O comentário é obrigatório",
        "string.empty": "O comentário  não pode estar vazio",
        "string.pattern.base":"O comentário só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max":"O comentário deve ter no máximo 40 caracteres",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = validateModerationBody;
