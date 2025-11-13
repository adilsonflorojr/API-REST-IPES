const Joi = require("joi");

const validateUpdateTreeBody = (req, res, next) => {
  const schema = Joi.object({
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .messages({
        "array.base": "A coordenada deve ser um vetor",
        "array.length": "A coordenada  deve ter exatamente 2 números",
      }),
    street: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(50)
      .min(4)
      .messages({
        "string.empty": "O nome da rua não pode estar vazio",
        "string.pattern.base": "O nome da rua só pode conter letras, espaços (não no início)",
        "string.max": "O nome da rua deve ter no máximo 50 caracteres",
        "string.min": "O nome da rua deve ter no minimo 4 caracteres",
      }),
    reference_point: Joi.string()
     .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/) 
      .max(50)
      .messages({
        "string.empty": "O ponto de referência não pode estar vazio",
        "string.pattern.base": "O ponto de referência  só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O ponto de referência deve ter no máximo 50 caracteres",
      }),
    flower_color: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(25)
      .messages({
        "string.empty": "A cor das flores não pode estar vazio",
        "string.pattern.base": "A cor das flores  só pode conter letras, espaços (não no início).",
        "string.max": "A cor das flores deve ter no máximo 25 caracteres",
      }),
    tree_size: Joi.string()
      .trim()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(15)
      .messages({
        "string.empty": "O tamanho da árvore não pode estar vazio",
        "string.pattern.base": "O tamanho da árvore só pode conter letras, espaços (não no início).",
        "string.max": "O tamanho da árvore deve ter no máximo 15 caracteres",
      }),
    age: Joi.number()
      .max(5)
      .messages({
        "number.base": "A idade da árvore deve ser um número",
        "number.max": "A idade da árvore deve ter no máximo 5 dígitos",
      }),
    comment: Joi.string()
       .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/) 
      .max(60)
      .messages({
        "string.empty": "O comentário não pode estar vazio",
        "string.pattern.base": "O comentário ó pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O comentário  deve ter no máximo 60 caracteres",
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
