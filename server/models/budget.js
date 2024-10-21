const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  totalBudget: { type: Number, required: true },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  remainingBudget: { type: Number }
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
