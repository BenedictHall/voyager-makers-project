const ExpenseSchema = require("../models/expense")


const addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body

    const budget = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await budget.save()
        res.status(201).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(budget)
}

const getExpenses = async (req, res) =>{
    try {
        const budgets = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((budget) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
};

const ExpenseController = {
    addExpense:addExpense,
    getExpenses:getExpenses,
    deleteExpense:deleteExpense

};

module.exports = ExpenseController;