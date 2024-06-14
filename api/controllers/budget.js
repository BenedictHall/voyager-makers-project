const Budget = require("../models/budget");
const { generateToken } = require("../lib/token");

const getAllBudget = async (req, res) => {
    const budgets = await Budget.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ budgets: budgets, token: token });
};

const createBudget = async (req, res) => {
    const title = req.body.title;
    const amount = req.body.amount;
    const userId = req.user_id;
    const tripId = req.body.tripId;
    
    try{
    const budget = new Budget({
        title: title,
        amount: amount, 
        userId: userId, 
        tripId: tripId,
    });
    
    await budget.save();
        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: "budget Created", token: newToken, budget: budget });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const BudgetController = {
    getAllBudget:getAllBudget,
    createBudget:createBudget,
    // toggleCompleteToDo: toggleCompleteToDo,
    // deleteToDo: deleteToDo,
}


module.exports = BudgetController;