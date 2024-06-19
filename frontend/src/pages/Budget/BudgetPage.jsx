import AddBudgetForm from "../../components/Budget/BudgetForm"
import BudgetItem from "../../components/Budget/BudgetItem"
import { getBudgets } from "../../services/budget"
import { useState , useEffect} from "react"
import { useParams } from "react-router-dom";



export const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    let tripId = useParams().tripId

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getBudgets(token)
                .then((data) => {
                    // console.log('this is data', data)
                    setBudgets(data.budgets.filter((budget) => {return budget.tripId == tripId}));
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch budgets:", error);
                });
        }
    }, []);

    const handleBudgetCreated = (newBudget) => {
        setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
        window.location.reload();
    };


    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    return (
        <div className="InnerLayout">
            <h1>My Budget</h1>
            
            <AddBudgetForm tripId={tripId} onBudgetCreated={handleBudgetCreated}/>
            <h2>My Budgets:</h2>
            <div >
                {budgets && budgets.length > 0 ? (
                    budgets.map((budget)=>(
                    <BudgetItem token={token} key={budget._id} budget={budget}/>
                ))
                ): (
                <p>No budgets to display.</p>
                )} 
            </div>
        </div>
    );
};

export default BudgetPage;
