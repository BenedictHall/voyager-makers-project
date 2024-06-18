const BudgetSchema = require("../models/budget")
const {generateToken} = require("../lib/token");


const addBudget = async (req, res) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const tripId = req.body.tripId;

    const budget = new BudgetSchema({
        title: title,
        amount: amount,
        tripId: tripId,
    })

    try {
        if(!title){
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

    // console.log(budget)
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
    // console.log('what is this req.params', req.params)
    const budgetData = req.body;
    // console.log('what is this req.body', req.body)
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
    const budgetId = req.body.budgetId;
    const newToken = generateToken(req.user_id);
    try {
        const budget = await BudgetSchema.findById(budgetId);
        console.log("this is the budget!!!!", budget)
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        await budget.deleteOne({ _id: budgetId});
        res.status(200).json({ message: "Budget Deleted", token: newToken});
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const BudgetController = {
    addBudget:addBudget,
    getBudgets:getBudgets,
    getOneBudget:getOneBudget,
    updateBudget:updateBudget,
    deleteBudget:deleteBudget

};

module.exports = BudgetController;