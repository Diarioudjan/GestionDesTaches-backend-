import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ status: 'success', data: { task } });
};

export const listTasks = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    priority,
    assignee,
    search,
    sort = '-createdAt'
  } = req.query;

  const filter = { createdBy: req.user._id };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignee) filter.assignee = assignee;
  if (search) filter.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);

  const query = Task.find(filter)
    .populate('assignee')
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const [items, total] = await Promise.all([query, Task.countDocuments(filter)]);

  res.json({
    status: 'success',
    data: {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit) || 1),
      },
    },
  });
};

export const getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id }).populate('assignee');
  if (!task) return res.status(404).json({ status: 'echec', message: 'Tache non trouvée' });
  res.json({ status: 'success', data: { task } });
};

export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    req.body,
    { new: true }
  ).populate('assignee');
  if (!task) return res.status(404).json({ status: 'echec', message: 'Tache non trouvée' });
  res.json({ status: 'success', data: { task } });
};

export const deleteTask = async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!deleted) return res.status(404).json({ status: 'success', message: 'Tache non trouvée' });
  res.json({ status: 'success', message: 'Tache supprimée' });
};
