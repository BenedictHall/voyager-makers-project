const BudgetSchema = require("../models/budget")
const {generateToken} = require("../lib/token");

// const addBudget = (req, res) => {
//     const { title, amount, category, description, date } = req.body;

//     const budget = new BudgetSchema({
//         title,
//         amount,
//         category,
//         description,
//         date
//     });

//     // Validations
//     if (!title || !category || !date || !description) {
//         return res.status(400).json({ message: 'All fields are required!' });
//     }
//     if(amount <= 0 || !amount === 'number') {
//         return res.status(400).json({ message: 'Amount must be a positive number!' });
//     }
    
//     budget
//         .save()
//         .then((budget) => {
//             console.log("Budget created, id: ", budget._id.toString());
//             res.status(201).json({ message: "Budget Added" });
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({ message: "Server Error" });
//         });
// };

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
    const budget = await BudgetSchema.find({_id:req.budget_id});
    const token = generateToken(req.user_id);
    res.status(200).json({ budget: budget, token: token });
};

const deleteBudget = async (req, res) =>{
    // const { budgetId } = req.body;
    // console.log("is this the ID?", req.body)
    // try {
    //     const budget = await BudgetSchema.findById(budgetId);
    //     console.log("this is the budget id", budgetId)
    //     if (!budget) {
    //         return res.status(404).json({ message: "Budget not found" });
    //     }
    //     await budget.deleteOne({ _id: budgetId});
    //     console.log("Is this it?", budgetId)
    //     res.status(201).json({ message: "Budget Deleted"});
    // } catch (error) {
    //     console.error(error);
    //     res.status(400).json({ message: "Internal server error" });
    // }
    const {id} = req.params;
    console.log ()
    console.log("is this the id", req.params)
    BudgetSchema.findByIdAndDelete(id)
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
    deleteBudget:deleteBudget

};

module.exports = BudgetController;