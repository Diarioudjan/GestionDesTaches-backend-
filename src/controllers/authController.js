import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ status: 'echec', message: 'Email dejà utilisé' });
  const user = await User.create({ name, email, password, role });
  const token = sign(user);
  res.status(201).json({ status: 'success', data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } , token } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ status: 'echec', message: 'Données invalides !' });
  const match = await user.comparePassword(password);
  if (!match) return res.status(401).json({ status: 'echec', message: 'Données invalides !' });
  const token = sign(user);
  res.json({ status: 'success', data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } , token } });
};

export const me = async (req, res) => {
  res.json({ status: 'success', data: { user: req.user } });
};
