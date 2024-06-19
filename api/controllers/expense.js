const ExpenseSchema = require("../models/expense")
const {generateToken} = require("../lib/token");


const addExpense = async (req, res) => {
    const description = req.body.description;
    const amount = req.body.amount;
    const date = req.body.date;
    const category = req.body.category;
    const budgetId = req.body.budgetId;


    const expense = new ExpenseSchema({
        description: description,
        amount: amount,
        date: date,
        category: category,
        budgetId: budgetId   
    })

    try {
        //validations
        if(!category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(201).json({message: 'Expense Added'})
    } catch (error) {
        res.status(400).json({message: 'Server Error'})
    }

    // console.log(expense)
}

const getExpenses = async (req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        const token = generateToken(req.user_id);
        res.status(200).json({expenses:expenses, token:token})
    } catch (error) {
        res.status(400).json({message: 'Server Error'})
    }
}

const deleteExpense = async (req, res) =>{
    const expenseId = req.body.expenseId;
    const newToken = generateToken(req.user_id);
    // console.log ()
    // console.log("is this the id", req.params)
    try {
        const expense = await ExpenseSchema.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        await expense.deleteOne({ _id: expenseId});
        res.status(200).json({message: 'Expense Deleted', token:newToken})
    } catch (error) {
        console.error(error)
        res.status(400).json({message: 'Internal server Error'});
    };
    
};

const ExpenseController = {
    addExpense:addExpense,
    getExpenses:getExpenses,
    deleteExpense:deleteExpense

};

module.exports = ExpenseController;