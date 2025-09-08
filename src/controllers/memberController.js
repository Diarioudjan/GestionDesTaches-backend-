import Member from '../models/Member.js';

export const createMember = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'echec', message: 'Accès refusé. Seuls les administrateurs peuvent créer des membres.' });
  }
  const member = await Member.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ status: 'success', data: { member } });
};

export const listMembers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const query = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
    : {};

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Member.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Member.countDocuments(query),
  ]);

  res.json({
    status: 'success',
    data: { items, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit) || 1) } },
  });
};

export const getMember = async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', data: { member } });
};

export const updateMember = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'echec', message: 'Accès refusé. Seuls les administrateurs peuvent modifier des membres.' });
  }
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!member) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', data: { member } });
};

export const deleteMember = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'echec', message: 'Accès refusé. Seuls les administrateurs peuvent supprimer des membres.' });
  }
  const deleted = await Member.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', message: 'Membre supprimé !' });
};
