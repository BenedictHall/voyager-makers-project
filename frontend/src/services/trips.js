const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const newTrip = async (location, startDate, endDate) => {
    const payload = {
        location: location, 
        startDate: startDate, 
        endDate: endDate
    }
    const requestOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
        }, 
        body:JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);
    if (response.status !== 201) {
        let data = await response.json(); 
        return data.token
    } else {
        throw new Error ( 
            `Received status ${response.status} when logging in. Expected 201`
        );
    };

};