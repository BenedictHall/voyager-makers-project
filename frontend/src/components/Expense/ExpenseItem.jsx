import moment from 'moment'

const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

function ExpenseItem ({id, title, amount, date, description}) {
    console.log("Deleting item with id:", id);

    return(
        <>
            <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{amount}</p>
                        <p>{dateFormat(date)}</p>
                        <p>{description}</p>
                        {/* <div>
                        <button onClick={() => deleteItem(id)}>Delete</button>
                        </div> */}
                        
                    </div>
                </div>
        </>
    )
}

export default ExpenseItem