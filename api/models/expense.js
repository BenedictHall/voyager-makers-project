const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    description: {type: String, required: true, maxLength: 20, trim: true},
    amount: {type: Number, required: true, maxLength: 20, trim: true},
    date: {type: Date, required: true, trim: true},
    category: {type: String, required: true, trim: true},
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" }
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)