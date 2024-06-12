const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const newTrip = async (token, location, startDate, endDate) => {
    const payload = {
        token: token,
        location: location, 
        startDate: startDate, 
        endDate: endDate
    }
    const requestOptions = {
        method:'POST',
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`
        }, 
        body:JSON.stringify(payload),
    };
    let response = await fetch(`${BACKEND_URL}/trips/newtrip`, requestOptions); 
    if (response.status !== 201) {
    throw new Error("Unable to create trip");
    } else {
    let newTripResponse = await response.json();
    const newTrip = newTripResponse.trip
    return newTrip;
    }


    // const response = await fetch(`${BACKEND_URL}/tokens`, requestOptions);
    // if (response.status !== 201) {
    //     let data = await response.json(); 
    //     return data.token
    // } else {
    //     throw new Error ( 
    //         `Received status ${response.status} when logging in. Expected 201`
    //     );
    // }

};