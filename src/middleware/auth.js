import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  if (!token) return res.status(401).json({ status: 'echec', message: 'aucun token !' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ status: 'echec', message: 'Utilisateur Introuvable !' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ status: 'echec', message: 'token expiré ou Invalide !' });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ status: 'echec', message: 'Pas Accordé' });
  }
  next();
};
