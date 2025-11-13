const Joi = require("joi");

const validateTreeBody = (req, res, next) => {
  const schema = Joi.object({
    coordinates: Joi.array()
      .items(Joi.number().required())
      .length(2)
      .required()
      .messages({
        "any.required": "A coordenada é obrigatório",
        "array.base": "A coordenada deve ser um vetor",
        "array.length": "A coordenada deve ter exatamente 2 números",
      }),
    street: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .required()
      .min(4)
      .max(50)
      .messages({
        "any.required": "O nome da rua é obrigatório",
        "string.empty": "O nome da rua não pode estar vazio",
        "string.pattern.base":
          "O nome da rua só pode conter letras, espaços (não no início).",
        "string.max": "O nome da rua deve ter no máximo 50 caracteres",
        "string.min": "O nome da rua deve ter no minimo 4 caracteres",
      }),
    reference_point: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .required()
      .max(50)
      .messages({
        "any.required": "O ponto de referência é obrigatório",
        "string.empty": "O ponto de referência  não pode estar vazio",
        "string.pattern.base":
          "O ponto de referência só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max":
          "O ponto de referência deve ter no máximo 50 caracteres",
      }),
    flower_color: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .required()
      .max(25)
      .messages({
        "any.required": "A cor das flores é obrigatório",
        "string.empty": "A cor das flores não pode estar vazio",
        "string.pattern.base":
          "A cor das flores só pode conter letras, espaços (não no início).",
        "string.max": "A cor das flores deve ter no máximo 25 caracteres",
      }),
    tree_size: Joi.string()
     .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .required()
      .max(15)
      .messages({
        "any.required": "O tamanho da árvore é obrigatório",
        "string.empty": "O tamanho da árvore não pode estar vazio",
        "string.pattern.base":
          "O tamanho da árvore só pode conter letras, espaços (não no início).",
        "string.max": "O tamanho da árvore deve ter no máximo 15 caracteres",
      }),
    age: Joi.number().required().max(1500).messages({
      "any.required": "A idade da árvore é obrigatório",
      "number.base": "A idade da árvore deve ser um número",
      "number.max": "A idade da árvore deve ser até 1500 ",
    }),
    comment: Joi.string()
      .max(60)
      .required()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .messages({
        "any.required": "O comentário é obrigatório",
        "string.empty": "O comentário não pode estar vazio",
        "string.pattern.base":
          "O comentário só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O comentário deve ter no máximo 60 caracteres",
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
