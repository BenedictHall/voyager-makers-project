const BudgetSchema = require("../models/budget")
const {generateToken} = require("../lib/token");


const addBudget = async (req, res) => {
    const {title, amount, date, category, description}  = req.body

    const budget = BudgetSchema({
        title,
        amount,
        date,
        category,
        description,
    })

    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await budget.save()
        console.log("budget created, id: ", budget._id.toString());
        res.status(201).json({message: 'Budget Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(budget)
}

const getBudgets = async (req, res) =>{
    try {
        const budgets = await BudgetSchema.find().sort({createdAt: -1})
        const token = generateToken(req.user_id);
        res.status(200).json({budgets:budgets, token:token})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const getOneBudget = async (req, res) => {
    
    const { budgetId } = req.params;
    const budget = await BudgetSchema.find({_id:budgetId});
    const token = generateToken(req.user_id);
    res.status(200).json({ budget: budget, token: token });
}

const updateBudget = async (req, res) => {
    const { budgetId } = req.params;
    console.log('what is this req.params', req.params)
    const budgetData = req.body;
    console.log('what is this req.body', req.body)
    try {
        const budget = await BudgetSchema.findById({_id:budgetId});
        budget.amount = budgetData.amount
        await budget.save();
        res.status(200).send({ message: "new budget is saved"});
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
}

const deleteBudget = async (req, res) =>{
    const { budgetId } = req.params;
    console.log("is this the id", req.params)
    BudgetSchema.findByIdAndDelete(budgetId)
        // console.log("show me the id", {id})
        .then((budget) =>{
            res.status(200).json({message: 'Budget Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

const BudgetController = {
    addBudget:addBudget,
    getBudgets:getBudgets,
    getOneBudget:getOneBudget,
    updateBudget:updateBudget,
    deleteBudget:deleteBudget

};

module.exports = BudgetController;