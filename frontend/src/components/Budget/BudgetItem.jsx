import moment from 'moment'
import { deleteBudget } from '../../services/budget'


function BudgetItem (props) {
    const token = props.token;
    const budgetId = props.budget._id;
    const amount = props.budget.amount;
    const title = props.budget.title;
    

    
    const handleDeleteBudget = async () => {
        try {
            await deleteBudget(token, budgetId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    }

    return(
        <>
            <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>Total: {amount}</p>
                        <p>Remaining: </p>
                        <a href={`/budget/${budgetId}`}>View Expenses</a>
                        <div>
                        <button onClick={handleDeleteBudget}>Delete</button>
                        </div>
                        
                    </div>
                </div>
        </>
    )
}

export default BudgetItem