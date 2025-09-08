import User from '../models/User.js';
import Member from '../models/Member.js';

export const listAllUsers = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const searchQuery = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
    : {};

  const skip = (Number(page) - 1) * Number(limit);

  const [users, members] = await Promise.all([
    User.find(searchQuery).select('-password').lean(),
    Member.find(searchQuery).select('-password').lean()
  ]);

  // Combiner et marquer le type
  const allUsers = [
    ...users.map(user => ({ ...user, type: 'User' })),
    ...members.map(member => ({ ...member, type: 'Member' }))
  ];

  // Trier par date de création
  allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination manuelle
  const total = allUsers.length;
  const paginatedUsers = allUsers.slice(skip, skip + Number(limit));

  res.json({
    status: 'success',
    data: {
      items: paginatedUsers,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit) || 1)
      }
    }
  });
};