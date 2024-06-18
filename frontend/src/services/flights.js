const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const trackNewFlight = async (token, carrierCode, flightNumber, departureDate) => {
    const payload = {
        token: token,
        carrierCode: carrierCode,
        flightNumber: flightNumber,
        departureDate: departureDate
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(payload),
    };
    let response = await fetch(`${BACKEND_URL}/flights/newflight`, requestOptions);
    if (response.status !== 201) {
        throw new Error("Unable to save this flight");
    } else {
        let trackNewFlightResponse = await response.json();
        const newFlight = trackNewFlightResponse.flight;
        return newFlight;
    }
}

export const getTrackedFlights = async(token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bear ${token}`,
        },
    };
    const response = await fetch(`${BACKEND_URL}/flights`, requestOptions);

    if(response.status !==200) {
        throw new Error("Unable to fetch tracked flights");
    }
    const data = await response.json();
    return data;
}