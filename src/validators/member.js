import Joi from 'joi';

export const createMemberSchema = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().min(2).max(30).optional(),
});

export const updateMemberSchema = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().min(2).max(30).optional(),
});
