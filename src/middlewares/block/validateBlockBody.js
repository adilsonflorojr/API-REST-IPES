const Joi = require("joi");

const validateBlockBody = (req, res, next) => {
  const schema = Joi.object({
    block_reason: Joi.string()
        .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .max(100)
      .required()
      .messages({
        "any.required": "O campo block_reason é obrigatório",
        "string.empty": "O campo block_reason não pode estar vazio",
        "string.max": "O campo block_reason deve ter no máximo 100 caracteres",
        "string.pattern.base":
          "O block_reason só pode conter letras, espaços, vírgula e pontos",
      }),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = validateBlockBody;
