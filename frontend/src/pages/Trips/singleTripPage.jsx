import { useState, useEffect } from "react";
import SingleTripItem from "../../components/Trip/SingleTripItem";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTrip } from "../../services/trips";


export function SingleTripPage () {
    const [ tripInformation, setTripInformation ] = useState(null);
    let { tripId } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (tripId && token) {
            getTripInformation(token);
        }
    }, []);

    console.log(tripId);

    async function getTripInformation() {
        const response = await getSingleTrip(token,tripId);
        console.log(response);
        if(response){
            setTripInformation(response.singleTrip);
        }
    }

    const token = localStorage.getItem("token");
    if(!token || !tripId) {
        navigate("/");
        return;
    }

    return(
        <>
            <h3>Single Trip Information</h3>
            <SingleTripItem data={tripInformation} />
        </>
    )
}