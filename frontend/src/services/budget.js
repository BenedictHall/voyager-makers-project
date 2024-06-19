const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const addBudget = async (token, title, amount, tripId) => {
    const payload = {
        token: token,
        title: title,
        amount: amount,
        tripId: tripId,
    
    }
    console.log("this is payload", payload)
    const requestOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }, 
        body:JSON.stringify(payload),
    
    };
    let response = await fetch(`${BACKEND_URL}/budget`, requestOptions); 
    console.log(response.status)
    if (response.status !== 200 && response.status !==201) {
    throw new Error("Unable to add budget");
    } else {
    let addBudgetResponse = await response.json();
    const addBudget = addBudgetResponse.budget
    return addBudget;
    }
};

export const getBudgets = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/budget`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch budget");
    }
    
    const data = await response.json();
    return data;
};

// export const getOneBudget = async (token, budgetId) => {
//     const requestOptions = {
//     method: "GET",
//     headers: {
//     Authorization: `Bearer ${token}`,
//     },
// };

// const response = await fetch(`${BACKEND_URL}/budget/${budgetId}`, requestOptions);

// if (response.status !== 200) {
//     throw new Error("Unable to fetch budget");
// }

// const data = await response.json();
// return data;
// };

// export const updateBudeget = async(token, budgetId) => {
//     const payload = {
//         budgetId: budgetId,
//     };
//     const requestOptions = {
//         method: "PUT",
//         headers: {
//         Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//     }
//     const response = await fetch(`${BACKEND_URL}/budget/${budgetId}`, requestOptions);

//     if (response.status === 200) {
//         let data = await response.json();
//         return data;
//     } else {
//         throw new Error(
//             `Unable to update Budget. Received status ${response.status}. Expected 200`
//         );
//     }
// };

export const deleteBudget = async (token, budgetId) => {
    const payload = {
        budgetId: budgetId,
    };

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/budget`, requestOptions);


    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        throw new Error(
            `Unable to delete budget. Received status ${response.status}. Expected 200`
        );
    }
};

export const calculateRemainingBudget = async (token, budgetId) => {
    const payload = {
        budgetId: budgetId,
    };
    console.log("!!!this is payload", payload)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${BACKEND_URL}/budget/remaining`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        console.log("!!!!!!this is data", data)
        return data;
    } else {
        throw new Error(
            `Unable to calculate remaining budget. Received status ${response.status}. Expected 200`
        );
    }
};

//calculte the budget after deducting expenses

// export const deductExpenseFromBudget = async (token, budgetId, expenseAmount) => {
//     try{
//         const budget = await getOneBudget()
//         const newAmount = budget.amount - expenseAmount;
//         if (newAmount < 0) {
//             throw new Error("Expense exceeds the budget amount");
//         }
//         const updateResponse = await fetch(`${BACKEND_URL}/budget/${budgetId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`
//             },
//             body: JSON.stringify({ ...budget, amount: newAmount })
//         });

//         if (updateResponse.status !== 200) {
//             throw new Error("Failed to update budget");
//         }

//         return await updateResponse.json();
//     } catch (error) {
//         console.error("Error handling expense deduction:", error);
//         throw error;
//     }
// }