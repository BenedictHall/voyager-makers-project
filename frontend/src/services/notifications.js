const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllNotifications = async (token, userId) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bear ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/notifications/${userId}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch notifications");
    }
    
    const data = await response.json();
    return data;
};

export const getUnreadNotifications = async (token, userId) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bear ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/notifications/${userId}/unread`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch notifications");
    }
    
    const data = await response.json();
    return data;
};

export const markNotificationsAsRead = async (token, userId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bear ${token}`,
        },
    };

    await fetch(`${BACKEND_URL}/notifications/${userId}/read`, requestOptions);

//     if (response.status !== 200) {
//         throw new Error("Unable to fetch notifications");
//     }
    
//     const data = await response.json();
//     return data;
};
