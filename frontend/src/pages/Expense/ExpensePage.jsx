
import { useState , useEffect} from "react"
// import '../../../css/budgetPage.css'
import AddExpenseForm from "../../components/Expense/ExpenseForm"
import ExpenseItem from "../../components/Expense/ExpenseItem"
import { getExpenses } from "../../services/expense"
import { useParams } from "react-router-dom";


export const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    let budgetId = useParams().budgetId;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getExpenses(token)
                .then((data) => {
                    console.log('this is data', data)
                    setExpenses(data.expenses.filter((expense) => {return expense.budgetId == budgetId}));
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch expenses:", error);
                });
        }
    }, []);

    const handleExpenseCreated = (newExpense) => {
        setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
        window.location.reload();
    };


    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }

    return (
        <div className="InnerLayout">
            <h1>My Expense</h1>
            
            <AddExpenseForm budgetId={budgetId} onExpenseCreated={handleExpenseCreated}/>
            {console.log('what is the expense', expenses)}
            <div >
                {expenses && expenses.length > 0 ? (
                    expenses.map((expense)=>(
                    <ExpenseItem 
                    expense={expense}
                    token={token}
                    key={expense._id}
                    title={expense.title}
                    amount={expense.amount}
                    date={expense.date}
                    description={expense.description}
                    // deleteItem={deleteBudget}
                />
                ))
                ): (
                <p>No expenses to display.</p>
                )} 
            </div>
        </div>
    );
};

export default ExpensePage;
