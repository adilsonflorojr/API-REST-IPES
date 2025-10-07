const Joi = require("joi");

const validateModerationStatusMarking = (req, res, next) => {
  const schema = Joi.object({
    status_marking: Joi.string()
      .pattern(/^(?!\s)[A-Za-zÀ-ÿ\s.,]+$/)
      .max(10) 
      .required()
      .messages({
        "any.required": "O campo 'status_marking' é obrigatório",
        "string.empty": "O campo 'status_marking' não pode estar vazio",
        "string.pattern.base": "O campo 'status_marking' só pode conter letras, espaços (não no início), vírgulas e pontos.",
        "string.max": "O campo 'status_marking' só pode conter letras, espaços, vírgula e pontos",
      }),
  })
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      error: "Validação falhou",
      details: error.details.map(d => d.message),
    });
  }

  next();
};

module.exports = validateModerationStatusMarking;
