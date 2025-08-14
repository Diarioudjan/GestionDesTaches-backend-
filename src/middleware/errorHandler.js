// eslint-disable-next-line no-unused-vars
export const notFound = (req, res, next) => {
  res.status(404).json({ status: 'echec', message: 'Route Introuvable' });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Erreur dans le server ! ',
  });
};
