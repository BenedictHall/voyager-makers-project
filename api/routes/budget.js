const express = require("express");
const BudgetController = require("../controllers/budget");
const router = express.Router();

router.get("/", BudgetController.getAllBudget);
router.post("/", BudgetController.createBudget);

module.exports = router;