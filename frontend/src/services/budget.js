const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log(BACKEND_URL)

export const addBudget = async (token, title, amount, date, category, description) => {
    const payload = {
        token: token,
        title: title,
        amount: amount,
        date: date,
        category: category,
        description: description,
    
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
    console.log("this is response", response)
    if (response.status !== 200) {
        throw new Error("Unable to fetch budget");
    }
    
    const data = await response.json();
    return data;
};

export const getOneBudget = async (token) => {
    const requestOptions = {
    method: "GET",
    headers: {
    Authorization: `Bearer ${token}`,
    },
};

const response = await fetch(`${BACKEND_URL}/budget/getOneBudget`, requestOptions);

if (response.status !== 200) {
    throw new Error("Unable to fetch users");
}

const data = await response.json();
return data;
};

export const deleteBudget = async (token, budgetId) => {
    const payload = {
        budgetId: budgetId,
    };
    console.log("this is line 75 payload", payload)

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
            `Unable to delete toDo. Received status ${response.status}. Expected 200`
        );
    }
};