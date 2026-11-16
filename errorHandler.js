export function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ error: err.message });
  }
  if (err.code === 11000) return res.status(400).json({ error: 'A record with that value already exists.' });
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
}
