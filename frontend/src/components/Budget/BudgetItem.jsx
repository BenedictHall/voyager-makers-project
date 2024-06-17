


// export const ShowBudget = ({budget}) => {
    
//     const budgetId = budget._id 
//     console.log("what is this?", budget._id);
    
//     return (
//         <div key={budgetId}>
//             <p>{budget.title}</p>
//             <p>{budget.amount}</p>
//             <p>{budget.description}</p>
//         </div>
//     )

// };



function BudgetItem ({id, title, amount, description}) {
    console.log("Deleting item with id:", id);

    return(
        <>
            <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{amount}</p>
                        <p>{description}</p>
                        {/* <div>
                        <button onClick={() => deleteItem(id)}>Delete</button>
                        </div> */}
                        
                    </div>
                </div>
        </>
    )
}

export default BudgetItem