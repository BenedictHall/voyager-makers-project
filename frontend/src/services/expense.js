const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addExpense = async (token, description, amount, date, category, budgetId) => {
    const payload = {
        token: token,
        description: description,
        amount: amount,
        date: date,
        category: category,
        budgetId: budgetId,
    
    }
    const requestOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }, 
        body:JSON.stringify(payload),
    
    };
    let response = await fetch(`${BACKEND_URL}/expense`, requestOptions); 
    console.log(response.status)
    if (response.status !== 200 && response.status !==201) {
    throw new Error("Unable to add expense");
    } else {
    let addExpenseResponse = await response.json();
    const addExpense = addExpenseResponse.expense
    return addExpense;
    }
};

export const getExpenses = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/expense`, requestOptions);
    console.log("this is response", response)
    if (response.status !== 200) {
        throw new Error("Unable to fetch expense");
    }
    
    const data = await response.json();
    return data;
};

// export const getOneExpense = async (token) => {
//     const requestOptions = {
//     method: "GET",
//     headers: {
//     Authorization: `Bearer ${token}`,
//     },
// };

// const response = await fetch(`${BACKEND_URL}/expense/getOneExpense`, requestOptions);

// if (response.status !== 200) {
//     throw new Error("Unable to fetch users");
// }

// const data = await response.json();
// return data;
// };

export const deleteExpense = async (token, expenseId) => {
    const payload = {
        expenseId: expenseId,
    };


    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/expense`, requestOptions);


    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(
            `Unable to delete expense. Received status ${response.status}. Expected 200`
        );
    }
};