const ExpenseController = require('../controllers/expense');
const express = require("express")
const router = express.Router();

router.get("/", ExpenseController.getExpenses);
router.post("/", ExpenseController.addExpense);
router.delete("/:id", ExpenseController.deleteExpense);

module.exports = router;