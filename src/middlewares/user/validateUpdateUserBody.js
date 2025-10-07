const Joi = require("joi");

const validateUpdateUserBody = (req, res, next) => {
  const schema = Joi.object({
    full_name: Joi.string() 
      .pattern(/^[^\s][A-Za-zÀ-ÿ\s]*$/)
      .max(50)
      .messages({
        "string.empty": "O campo full_name não pode estar vazio",
        "string.pattern.base": "O campo full_name só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo full_name deve ter no máximo 50 caracteres",
      }),
    email: Joi.string()
      .email()
      .messages({
        "string.email": "O campo email deve ser um email válido",
        "string.empty": "O campo email não pode estar vazio",
      }),
    username: Joi.string()
      .pattern(/^[A-Za-zÀ-ÿ0-9]+$/)
      .max(20)
      .messages({
        "string.empty": "O campo username não pode estar vazio",
        "string.pattern.base": "O username não pode conter espaços ou caracteres especiais",
        "string.max": "O campo username deve ter no máximo 20 caracteres",
      }),
    password: Joi.string()
      .min(6)
      .pattern(/^\S+$/)
      .messages({
        "string.empty": "O campo password não pode estar vazio",
        "string.min": "O campo password deve ter no mínimo 6 caracteres",
        "string.pattern.base": "O campo password não pode conter espaços",
      }),
    city_name: Joi.string()
      .min(4)
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s]+$/)
      .messages({
        "string.min": "O campo city_name deve ter no mínimo 4 caracteres",
        "string.empty": "O campo city_name não pode estar vazio",
        "string.pattern.base": "O campo city_name não pode começar com espaço e só pode conter letras e espaços",
      }),
    state: Joi.string()
      .pattern(/^(?!\s)[A-Za-z]{1,2}$/)
      .messages({
        "string.empty": "O campo state não pode estar vazio",
        "string.pattern.base": "O campo state deve ter 1 ou 2 letras e não pode começar com espaço",
      }),
    isAdmin: Joi.boolean().messages({
      "boolean.base": "O campo isAdmin deve ser true ou false",
    }),
  }).min(1); 

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map(d => d.message),
    });
  }

 
  next();
};

module.exports = validateUpdateUserBody;
