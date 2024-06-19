import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addBudget } from '../../services/budget';
import { addExpense } from '../../services/expense';




const AddExpenseForm = (props)=> {
    const budgetId = props.budgetId;
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: '',
        category: '',
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (newDate) => {
        setFormData(prevState => ({
            ...prevState,
            date: newDate
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const {description, amount, date, category,} = formData;
        
        try {
            const newExpense =await addExpense(token, description, amount, date, category, budgetId);
            props.onExpenseCreated(newExpense);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name ="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    <option value="Food and Drink">Food and Drink</option>
                    <option value="Transport">Transport</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Car Rental/Expenses">Car Rental/Expenses</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health and Safety">Health and Safety</option>
                    <option value="Communication">Communication</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            <br/>
        <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    name ="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            <br/>
            <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    name ="amount"
                    value={formData.amount}
                    onChange={handleChange}
                />
            <div>
            <br/>
            <label>Date:</label>
                <DatePicker
                    id="date-picker"
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <br/>
            <input role="submit-button" id="submit" type="submit" value="Submit" />

        </form>
        </>
    )

};

export default AddExpenseForm;