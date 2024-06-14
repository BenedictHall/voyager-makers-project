import AddBudgetForm from "../../components/Budget/AddBudgetForm";
import "../../../css/budget.css";

export const Budget = () => {
    return (
            <>
            <h2>show all my budget</h2>
                <div className="grid-lg">
                    <div className="flex-lg">
                        <AddBudgetForm />
                    </div>
                </div>
            </>
        );
};
