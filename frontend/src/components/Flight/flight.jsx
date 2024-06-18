export const Flight = ({ flight, token }) => {
    const { _id, carrierCode, flightNumber, departureDate } = flight;

    return (
        <div>
        <p>Carrier Code: {carrierCode}</p>
        <p>Flight Number: {flightNumber}</p>
        <p>Departure Date: {departureDate}</p>
    </div>
    )

};

export default Flight;