import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priority: { type: String, enum: ['faible', 'moyenne', 'elevée'], default: 'moyenne' },
    status: { type: String, enum: ['A_faire', 'en_cours', 'terminée'], default: 'A_faire' },
    dueDate: { type: Date },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);


export default mongoose.model('Task', taskSchema);
