const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" }
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;