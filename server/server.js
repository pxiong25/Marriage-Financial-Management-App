const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');  // Import the expense routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://paxiong25:Davidonly24@weddingexpensecluster.bwdtj.mongodb.net/?retryWrites=true&w=majority&appName=WeddingExpenseCluster';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the expense routes
app.use('/', expenseRoutes);

// Start the server explicitly on port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
