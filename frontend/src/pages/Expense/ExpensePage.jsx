
import { useState , useEffect} from "react"
// import '../../../css/budgetPage.css'
import AddExpenseForm from "../../components/Expense/ExpenseForm"
import ExpenseItem from "../../components/Expense/ExpenseItem"
import { getExpenses } from "../../services/expense"
import { useParams } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'

export const ExpensePage = () => {
    const [expenses, setExpenses] = useState([]);
    let budgetId = useParams().budgetId;
    let tripId = useParams().tripId;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getExpenses(token)
                .then((data) => {
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

    const aggregateExpensesByCategory = () => {
        const categoryTotals = {};
        expenses.forEach(expense => {
            const category = expense.category;
            if (categoryTotals[category]) {
                categoryTotals[category] += expense.amount;
            } else {
                categoryTotals[category] = expense.amount;
            }
        });
        return categoryTotals;
    };

    const categoryTotals = aggregateExpensesByCategory();
    const chartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6633',
                    '#FF33FF',
                    '#33FF33',
                    // Add more colors if there are more categories
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
    };

    return (
        <div className="InnerLayout">
            <h1>My Expense</h1>
            
            <AddExpenseForm budgetId={budgetId} onExpenseCreated={handleExpenseCreated}/>
            <h2>Expenses:</h2>
            <div>
            {expenses && expenses.length > 0 && (
                <div style={{ width: '50%', height: '200px', margin: 'auto' }}>
                    <Pie data={chartData} options={chartOptions}/>
                </div>
            )}
            </div>
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
            <a href={`/trips/${tripId}/budget`}><button>Back to Budget</button></a>
        </div>
    );
};

export default ExpensePage;
