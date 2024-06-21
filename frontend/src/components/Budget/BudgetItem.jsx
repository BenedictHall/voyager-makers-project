import moment from 'moment'
import { deleteBudget, calculateRemainingBudget } from '../../services/budget'
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react"


function BudgetItem (props) {
    const token = props.token;
    const budgetId = props.budget._id;
    const amount = props.budget.amount;
    const title = props.budget.title;
    let tripId = useParams().tripId;
    const [remaining, setRemaining] = useState(0);
    

    
    const handleDeleteBudget = async () => {
        try {
            await deleteBudget(token, budgetId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    }

    useEffect(() => {
        if (token) {

            calculateRemainingBudget(token, budgetId)
                .then((data) => {
                    setRemaining(data.remainingBudget);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch budgets:", error);
                });
        }
    }, []);
    
    return(
        <>
            <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>Total: £{amount}</p>
                        <p>Remaining: £{remaining} </p>
                        <a href={`/trips/${tripId}/budget/${budgetId}`}><button>View Expenses</button></a>
                        <div>
                        <button onClick={handleDeleteBudget}>Delete</button>
                        </div>
                        
                    </div>
                </div>
        </>
    )
}

export default BudgetItem