import moment from 'moment'
import { deleteExpense } from '../../services/expense'

const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

function ExpenseItem (props) {
    const token = props.token;
    const expenseId = props.expense._id;
    const description = props.expense.description;
    const amount = props.expense.amount;
    const date = props.expense.date;
    const category = props.expense.category;

    const handleDeleteExpense = async () => {
        try {
            await deleteExpense(token, expenseId);
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
                        <p>{category}</p>
                        <p>{description}</p>
                        <p>{amount}</p>
                        <p>{dateFormat(date)}</p>
                        <div>
                        <button onClick={handleDeleteExpense}>Delete</button>
                        </div>
                        
                    </div>
                </div>
        </>
    )
}

export default ExpenseItem