import {useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addBudget } from '../../services/budget';



const AddBudgetForm = (props)=> {
    const tripId = props.tripId;
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const {title, amount} = formData;
        
        try {
            const newBudget = await addBudget(token, title, amount, tripId);
            props.onBudgetCreated(newBudget);
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    name ="title"
                    value={formData.title}
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
            <br/>
            <input role="submit-button" id="submit" type="submit" value="Submit" />

        </form>
        </>
    )

};

export default AddBudgetForm;