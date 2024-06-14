import { HiOutlineCurrencyPound } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newBudget } from "../../services/budget";
import "../../../css/budget.css";


const AddBudgetForm = () =>{
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {title, amount} = formData;
        const token = localStorage.getItem("token");
        try {
            await newBudget(token, title, amount);
            navigate ("/budget");
        } catch (err) {
        console.error(err);
        // add a redirect here
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    return (
        <div className="form-wrapper">
            <h2>
                Create budget
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Title: </label>
                        <input 
                            type="text" 
                            name="title" 
                            id="newBudget"
                            placeholder="e.g., Trip"
                            value={formData.budgetName}
                            onChange={handleChange}
                            required
                        />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount: </label>
                        <input
                            type="number"
                            step="0.01"
                            name="amount"
                            id="newBudgetAmount"
                            placeholder="e.g., £30"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            inputMode="decimal"
                        />
                </div>
                {/* <input role="submit-button" id="submit" type="submit" value="Submit" /> */}
                <button type="submit" className="btn btn">
                    <span>Create Budget</span>
                    <HiOutlineCurrencyPound width={20} height={10}/>
                    
                </button>
            </form>
        </div>
    )
};

export default AddBudgetForm;