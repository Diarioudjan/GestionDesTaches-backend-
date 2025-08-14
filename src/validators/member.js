import Joi from 'joi';

export const createMemberSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  role: Joi.string().min(2).max(30).optional(),
});

export const updateMemberSchema = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().min(2).max(30).optional(),
});
