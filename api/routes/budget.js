const express = require("express");
const BudgetController = require("../controllers/budget");
const router = express.Router();

router.get("/", BudgetController.getBudgets);
router.get("/:budgetId", BudgetController.getOneBudget)
router.post("/", BudgetController.addBudget);
router.delete("/", BudgetController.deleteBudget);
router.put("/:budgetId", BudgetController.updateBudget)

module.exports = router;