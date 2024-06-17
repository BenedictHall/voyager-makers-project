const express = require("express");
const BudgetController = require("../controllers/budget");
const router = express.Router();

router.get("/", BudgetController.getBudgets);
router.get("/getOnebudget", BudgetController.getOneBudget)
router.post("/", BudgetController.addBudget);
router.delete("/:id", BudgetController.deleteBudget);

module.exports = router;