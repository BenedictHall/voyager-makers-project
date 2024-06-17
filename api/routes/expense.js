const ExpenseController = require('../controllers/expense');


const router = require('express').Router();


router.get("/", ExpenseController.getExpenses);
router.post("/", ExpenseController.addExpense);
router.delete("/", ExpenseController.deleteExpense);

module.exports = router;