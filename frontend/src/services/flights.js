const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const saveFlight = async (token, airline, airlineCode, flightNumber, flightDuration, departureAirport, arrivalAirport, departureDate) => {
    const payload = {
        token: token,
        airline: airline,
        airlineCode: airlineCode,
        flightNumber: flightNumber,
        arrivalAirport: arrivalAirport,
        flightDuration: flightDuration,
        departureAirport: departureAirport,
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
    console.log("request options", requestOptions)
    let response = await fetch(`${BACKEND_URL}/flights/saveNewFlight`, requestOptions);
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

export const getFlightFromAPI = async (carrierCode, flightNumber, departureDate) => {
    console.log("getting flight", carrierCode, flightNumber, departureDate, "from backend")
    let response = await fetch(`${BACKEND_URL}/flights/${carrierCode}-${flightNumber}-${departureDate}`);
    if (response.status !== 200) {
        throw new Error("Unable to get this flight data from external API at services");
    } else {
        console.log("Flight details recieved")
        let trackGetFlightFromAPI = await response.json();
        console.log("logging response from backend",trackGetFlightFromAPI)
        return trackGetFlightFromAPI;
    }
}