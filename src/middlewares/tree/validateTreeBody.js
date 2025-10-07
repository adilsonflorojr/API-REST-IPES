const Joi = require("joi");

const validateTreeBody = (req, res, next) => {
  const schema = Joi.object({
    coordinates: Joi.array()
      .items(Joi.number().required())
      .length(2)
      .required()
      .messages({
        "any.required": "O campo coordinates é obrigatório",
        "array.base": "O campo coordinates deve ser um vetor",
        "array.length": "O campo coordinates deve ter exatamente 2 números",
      }),
    street: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .required()
      .min(4)
      .max(50)
      .messages({
        "any.required": "O campo street é obrigatório",
        "string.empty": "O campo street não pode estar vazio",
        "string.pattern.base":
          "O campo street só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo street deve ter no máximo 50 caracteres",
        "string.min": "O campo street deve ter no minimo 4 caracteres",
      }),
    reference_point: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s]+$/)
      .required()
      .max(50)
      .messages({
        "any.required": "O campo reference_point é obrigatório",
        "string.empty": "O campo reference_point não pode estar vazio",
        "string.pattern.base":
          "O campo reference_point só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max":
          "O campo reference_point deve ter no máximo 50 caracteres",
      }),
    flower_color: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s]+$/)
      .required()
      .max(25)
      .messages({
        "any.required": "O campo flower_color é obrigatório",
        "string.empty": "O campo flower_color não pode estar vazio",
        "string.pattern.base":
          "O campo flower_color só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo flower_color deve ter no máximo 25 caracteres",
      }),
    tree_size: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s]+$/)
      .required()
      .max(15)
      .messages({
        "any.required": "O campo tree_size é obrigatório",
        "string.empty": "O campo tree_size não pode estar vazio",
        "string.pattern.base":
          "O campo tree_size só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo tree_size deve ter no máximo 15 caracteres",
      }),
    age: Joi.number().required().max(1500).messages({
      "any.required": "O campo age é obrigatório",
      "number.base": "O campo age deve ser um número",
      "number.max": "O campo age deve ser até 1500 ",
    }),
    comment: Joi.string()
      .max(60)
      .required()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .messages({
        "any.required": "O campo comment é obrigatório",
        "string.empty": "O campo comment não pode estar vazio",
        "string.pattern.base":
          "O campo comment só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo comment deve ter no máximo 60 caracteres",
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

module.exports = validateTreeBody;
