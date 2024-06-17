export default function SingleTripItem (props) {
    if (!props.data?._id) {
        return null;
    }
    const { data } = props;

    return(
        <div key={data._id}>
            <h2 data-testid="singleTripLocation">{data.location}</h2>
            <p data-testid="singleTripStartDate">{data.startDate}</p> 
            <p data-testid="singleTripEndDate">{data.endDate}</p>
        </div>
    );
}