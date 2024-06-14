const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllItineraries = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/itineraries`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
        // data is an array of itineraries and a new token
    } else {
        throw new Error(
            `Unable to fetch itineraries. Received status ${response.status}. Expected 200`
        );
    }
};

export const createItinerary = async (token, activity, date, startTime, endTime, tripId) => {
    const payload = {
        activity: activity,
        date: date,
        startTime: startTime,
        endTime: endTime,
        tripId: tripId,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/itineraries`, requestOptions);

    if (response.status === 201) {
        let data = await response.json();
        return data;
        // data is a new token and the new itinerary
    } else {
        throw new Error(
            `Unable to create itinerary. Received status ${response.status}. Expected 201`
        );
    }
};

export const deleteItinerary = async (token, itineraryId) => {
    const payload = {
        itineraryId: itineraryId,
    };

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/itineraries`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
        // data is a new token
    } else {
        throw new Error(
            `Unable to delete itinerary. Received status ${response.status}. Expected 200`
        );
    }
};