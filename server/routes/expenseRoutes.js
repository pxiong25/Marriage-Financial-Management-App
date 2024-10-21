const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');  // Import Expense model
const Budget = require('../models/budget');    // Import Budget model

// Set or update total budget
router.post('/budget', async (req, res) => {
  const { totalBudget } = req.body;

  const newBudget = new Budget({
    totalBudget,
    expenses: []  // Start with no expenses
  });

  try {
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add an expense and calculate the remaining budget
router.post('/budget/:id/expenses', async (req, res) => {
  const { itemName, amount, category } = req.body;

  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    // Create a new expense and save it to the database
    const expense = new Expense({
      itemName,
      amount,
      category
    });

    const savedExpense = await expense.save();  // Save the expense

    // Add the expense ID to the budget's expenses array
    budget.expenses.push(savedExpense._id);
    await budget.save();

    // Calculate total expenses and remaining budget
    const totalExpenses = await Expense.find({ _id: { $in: budget.expenses } });
    const totalExpenseAmount = totalExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remainingBudget = budget.totalBudget - totalExpenseAmount;


    res.json({ budget, remainingBudget });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
