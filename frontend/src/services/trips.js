const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const newTrip = async (token, userId, location, startDate, endDate, flight, flightNumber, accommodation, accommodationAddress) => {
    const payload = {
        token: token,
        userId: userId,
        location: location, 
        startDate: startDate, 
        endDate: endDate,
        flight: flight, 
        flightNumber: flightNumber, 
        accommodation: accommodation,
        accommodationAddress: accommodationAddress,
    }
    console.log("trip payload", payload)
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

//to get trips from the database

export const getTrips = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bear ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/trips`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch trips");
    }
    
    const data = await response.json();
    return data;
};


//to get single trip information from the database
export const getSingleTrip = async (token, tripId) => {
    const requestOptions = {
        mehod: "GET",
        headers: {
            Authorization: `Bear ${token}`
        },
    };

    const response = await fetch(`${BACKEND_URL}/trips/${tripId}`, requestOptions);

    if(response.status !== 200) {
        throw new Error("Unable to fetch trip data");
    }

    const data = await response.json();
    return data
}