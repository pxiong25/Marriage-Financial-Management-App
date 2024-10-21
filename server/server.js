const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');  // Import the expense routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://paxiong25:Davidonly24@weddingexpensecluster.bwdtj.mongodb.net/weddingExpenses?retryWrites=true&w=majority'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);  // Optional: Exit the app if connection fails
  });

// Use the expense routes
app.use('/expenses', expenseRoutes);


// Start the server explicitly on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
