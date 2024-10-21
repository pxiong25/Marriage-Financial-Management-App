const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');  // Import the Budget model

// Create a new budget
router.post('/', async (req, res) => {
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

module.exports = router;
