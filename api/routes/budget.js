const express = require("express");
const BudgetController = require("../controllers/budget");
const router = express.Router();

router.get("/", BudgetController.getBudgets);
router.post("/remaining", BudgetController.calculateRemainingBudget)
router.post("/", BudgetController.addBudget);
router.delete("/", BudgetController.deleteBudget);
// router.put("/:budgetId", BudgetController.updateBudget)

module.exports = router;