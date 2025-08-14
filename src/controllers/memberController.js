import Member from '../models/Member.js';

export const createMember = async (req, res) => {
  const member = await Member.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ status: 'success', data: { member } });
};

export const listMembers = async (req, res) => {
  const { page = 1, limit = 10, chercher = '' } = req.query;
  const query = chercher
    ? { $text: { $chercher: chercher }, createdBy: req.user._id }
    : { createdBy: req.user._id };

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
  const member = await Member.findOne({ _id: req.params.id, createdBy: req.user._id });
  if (!member) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', data: { member } });
};

export const updateMember = async (req, res) => {
  const member = await Member.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  );
  if (!member) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', data: { member } });
};

export const deleteMember = async (req, res) => {
  const deleted = await Member.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!deleted) return res.status(404).json({ status: 'echec', message: 'Membre Introuvable !' });
  res.json({ status: 'success', message: 'Membre supprimé !' });
};
