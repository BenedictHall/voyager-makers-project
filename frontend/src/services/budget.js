const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const newBudget = async (token, title, amount,tripId, userId) => {
    const payload = {
        token: token,
        title: title,
        amount: amount,
        tripId: tripId,
        userId: userId,
    }
    const requestOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }, 
        body:JSON.stringify(payload),
    };
    let response = await fetch(`${BACKEND_URL}/budget`, requestOptions); 
    if (response.status !== 201) {
    throw new Error("Unable to create budget");
    } else {
    let newBudgetResponse = await response.json();
    const newBudget = newBudgetResponse.budget
    return newBudget;
    }
};