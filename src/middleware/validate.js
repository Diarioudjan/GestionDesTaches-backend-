export const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      details: error.details.map(d => ({ message: d.message, path: d.path })),
    });
  }
  req[property] = value;
  next();
};
