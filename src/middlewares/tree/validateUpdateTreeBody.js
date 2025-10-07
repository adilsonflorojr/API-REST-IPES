const Joi = require("joi");

const validateUpdateTreeBody = (req, res, next) => {
  const schema = Joi.object({
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .messages({
        "array.base": "O campo coordinates deve ser um vetor",
        "array.length": "O campo coordinates deve ter exatamente 2 números",
      }),
    street: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(50)
      .min(4)
      .messages({
        "string.empty": "O campo street não pode estar vazio",
        "string.pattern.base": "O campo street só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo street deve ter no máximo 50 caracteres",
        "string.min": "O campo street deve ter no minimo 4 caracteres",
      }),
    reference_point: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(50)
      .messages({
        "string.empty": "O campo reference_point não pode estar vazio",
        "string.pattern.base": "O campo reference_point  só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo reference_point deve ter no máximo 50 caracteres",
      }),
    flower_color: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(25)
      .messages({
        "string.empty": "O campo flower_color não pode estar vazio",
        "string.pattern.base": "O campo flower_color  só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo flower_color deve ter no máximo 25 caracteres",
      }),
    tree_size: Joi.string()
      .trim()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(15)
      .messages({
        "string.empty": "O campo tree_size não pode estar vazio",
        "string.pattern.base": "O campo tree_size  só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo tree_size deve ter no máximo 15 caracteres",
      }),
    age: Joi.number()
      .max(5)
      .messages({
        "number.base": "O campo age deve ser um número",
        "number.max": "O campo age deve ter no máximo 5 dígitos",
      }),
    comment: Joi.string()
       .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/) 
      .max(60)
      .messages({
        "string.empty": "O campo comment não pode estar vazio",
        "string.pattern.base": "O campo comment só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo comment deve ter no máximo 60 caracteres",
      }),
  })
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map((d) => d.message),
    });
  }


  next();
};

module.exports = validateUpdateTreeBody;
