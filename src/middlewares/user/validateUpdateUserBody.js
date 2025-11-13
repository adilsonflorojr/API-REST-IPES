const Joi = require("joi");

const validateUpdateUserBody = (req, res, next) => {
  const schema = Joi.object({
    full_name: Joi.string()
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(50)
      .min(5)
      .messages({
        "string.empty": "O nome completo não pode estar vazio",
        "string.pattern.base":
          "O nome completo só pode conter letras, espaços (não no início)",
        "string.max": "O nome completo deve ter no máximo 50 caracteres",
        "string.min": "O nome completo deve ter no minimo 5 caracteres",
      }),
    email: Joi.string().email().messages({
      "string.email": "O email deve ser um email válido",
      "string.empty": "O email não pode estar vazio",
    }),
    username: Joi.string()
      .pattern(/^[A-Za-zÀ-ÿ0-9]+$/)
      .max(20)
      .messages({
        "string.empty": "O nome do usuário não pode estar vazio",
        "string.pattern.base":
          "O nome do usuário  não pode conter espaços ou caracteres especiais",
        "string.max": "O nome do usuário deve ter no máximo 20 caracteres",
      }),
    password: Joi.string().min(6).pattern(/^\S+$/).messages({
      "string.empty": "A senha não pode estar vazia",
      "string.min": "A senha deve ter no mínimo 6 caracteres",
      "string.pattern.base": "A senha não pode conter espaços",
    }),
    city_name: Joi.string()
      .min(4)
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .messages({
        "string.min": "O nome da cidade deve ter no mínimo 4 caracteres",
        "string.empty": "O nome da cidade  não pode estar vazio",
        "string.pattern.base":
          "O nome da cidade só pode conter letras, espaços (não no início).",
      }),
    state: Joi.string()
      .pattern(/^[A-Za-z]{2}$/)
      .messages({
        "string.empty": "O estado não pode estar vazio",
        "string.pattern.base":
          "O estado deve ter 2 letras e não pode começar com espaço",
      }),
    isAdmin: Joi.boolean().messages({
      "boolean.base": "isAdmin deve ser true ou false",
    }),
  }).min(1);

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};

module.exports = validateUpdateUserBody;
