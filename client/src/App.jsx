import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);

  // Fetch the budget and expenses when the component mounts
  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        // Fetch the budget
        const budgetResponse = await axios.get('http://localhost:5001/expenses/budget');
        setTotalBudget(budgetResponse.data.totalBudget);
        setRemainingBudget(budgetResponse.data.remainingBudget);

        // Fetch the expenses
        const expensesResponse = await axios.get('http://localhost:5001/expenses');
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchBudgetAndExpenses();
  }, []);

  // Handle budget submission
  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/expenses/budget', { totalBudget });
      setRemainingBudget(response.data.remainingBudget);
    } catch (error) {
      console.error('Error setting budget:', error);
    }
  };

  // Handle expense submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const { itemName, amount, category } = e.target.elements;
    const newExpense = {
      itemName: itemName.value,
      amount: parseFloat(amount.value),
      category: category.value,
    };

    try {
      const response = await axios.post(`http://localhost:5001/expenses/budget/your-budget-id/expenses`, newExpense);
      setExpenses([...expenses, newExpense]);
      setRemainingBudget(response.data.remainingBudget);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Wedding Budget Manager</h1>

        {/* Budget Input Form */}
        <form onSubmit={handleBudgetSubmit}>
          <label>Total Budget: </label>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(parseFloat(e.target.value))}
            className="input"
          />
          <button type="submit" className="button">Set Budget</button>
        </form>

        <h2>Remaining Budget: ${remainingBudget}</h2>

        {/* Expense Input Form */}
        <form onSubmit={handleExpenseSubmit}>
          <input type="text" name="itemName" placeholder="Expense Name" required className="input"/>
          <input type="number" name="amount" placeholder="Amount" required className="input"/>
          <input type="text" name="category" placeholder="Category" required className="input"/>
          <button type="submit" className="button">Add Expense</button>
        </form>

        {/* List of Expenses */}
        <ul className="expense-list">
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.itemName}: ${expense.amount} ({expense.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
