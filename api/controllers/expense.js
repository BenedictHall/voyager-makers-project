const ExpenseSchema = require("../models/expense")
const {generateToken} = require("../lib/token");


const addExpense = async (req, res) => {
    const {title, amount, date, category, description}  = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        date,
        category,
        description,
        
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(201).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

const getExpenses = async (req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        const token = generateToken(req.user_id);
        res.status(200).json({expenses:expenses, token:token})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const deleteExpense = async (req, res) =>{
    const {id} = req.params;
    console.log ()
    console.log("is this the id", req.params)
    ExpenseSchema.findByIdAndDelete(id)
        // console.log("show me the id", {id})
        .then((expense) =>{
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