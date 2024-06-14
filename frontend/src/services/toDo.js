const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllToDos = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    };
    
    const response = await fetch(`${BACKEND_URL}/toDos`, requestOptions);
    
    if (response.status === 200) {
        let data = await response.json();
        return data;
        // data is an array of toDos and a new token
    } else {
        throw new Error(
        `Unable to fetch toDos. Received status ${response.status}. Expected 200`
        );
    }
};

export const createToDo = async (token, title, description, dueDate, isCompleted, tripId, userId) => {
    const payload = {
        title: title,
        description: description,
        dueDate: dueDate,
        isCompleted: isCompleted,
        tripId: tripId,
        userId: userId,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/toDos`, requestOptions);

    if (response.status === 201) {
        let data = await response.json();
        return data;
        // data is a new token and the new toDo
    } else {
        throw new Error(
            `Unable to create toDo. Received status ${response.status}. Expected 201`
        );
    }
};

export const toggleCompleteToDo = async (token, toDoId) => {
    const payload = {
        toDoId: toDoId,
    };

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/toDos`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
        //data is the updated toDo and a new token
    } else {
        throw new Error(
            `Unable to toggle toDo. Received status ${response.status}. Expected 200`
        );
    }
};

export const deleteToDo = async (token, toDoId) => {
    const payload = {
        toDoId: toDoId,
    };

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/toDos`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
        // data is a new token
    } else {
        throw new Error(
            `Unable to delete toDo. Received status ${response.status}. Expected 200`
        );
    }
};