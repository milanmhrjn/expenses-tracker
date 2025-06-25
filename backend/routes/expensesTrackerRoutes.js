const express = require('express');
const router = express.Router();
const expensesTracker = require('../controller/expenseTracker.controller');

router.get('/expensesTracker', expensesTracker.getAllExpenses);
router.post('/expensesTracker', expensesTracker.createExpense);
router.put('/expensesTracker/:id', expensesTracker.updateExpense);
router.delete('/expensesTracker/:id', expensesTracker.deleteExpense);



module.exports = router;
