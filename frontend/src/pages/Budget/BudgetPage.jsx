import AddBudgetForm from "../../components/Budget/BudgetForm"
import BudgetItem from "../../components/Budget/BudgetItem"
import { deleteBudget, getBudgets } from "../../services/budget"
import { useState , useEffect} from "react"



export const Budget = () => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getBudgets(token)
                .then((data) => {
                    console.log('this is data', data)
                    setBudgets(data.budgets);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch budgets:", error);
                });
        }
    }, []);


    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    return (
        <div className="InnerLayout">
            <h1>My Budget</h1>
            
            <AddBudgetForm />
            {console.log('what is the budgets', budgets)}
            <div >
                {budgets && budgets.length > 0 ? (
                    budgets.map((budget)=>(
                    <BudgetItem
                    key={budget._id}
                    title={budget.title}
                    amount={budget.amount}
                    date={budget.date}
                    description={budget.description}
                    // deleteItem={deleteBudget}
                />
                ))
                ): (
                <p>No budgets to display.</p>
                )} 
            </div>
        </div>
    );
};

export default Budget;
