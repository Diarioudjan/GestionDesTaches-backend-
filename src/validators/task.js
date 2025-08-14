import Joi from 'joi';
import { Types } from 'mongoose';

const objectId = () =>
  Joi.string()
    .custom((value, helpers) => (Types.ObjectId.isValid(value) ? value : helpers.error('any.invalid')))
    .message('Invalid ObjectId');

export const createTaskSchema = Joi.object({
  title: Joi.string().min(2).max(120).required(),
  description: Joi.string().allow('', null),
  priority: Joi.string().valid('faible', 'moyenne', 'elevée').default('moyenne'),
  status: Joi.string().valid('A_faire', 'en_cours', 'terminée').default('A_faire'),
  dueDate: Joi.date().optional(),
  assignee: objectId().optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(2).max(120).optional(),
  description: Joi.string().allow(''),
  priority: Joi.string().valid('faible', 'moyenne', 'elevée').optional(),
  status: Joi.string().valid('A_faire', 'en_cours', 'terminée').optional(),
  dueDate: Joi.date().optional(),
  assignee: objectId().allow(null).optional(),
});
