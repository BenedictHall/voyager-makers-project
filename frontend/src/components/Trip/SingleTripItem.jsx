export default function SingleTripItem (props) {
    if (!props.data?._id) {
        return null;
    }
    const { data } = props;

    return(
        <div key={data._id}>
            <h2 data-testid="singleTripLocation">{data.location}</h2>
            <span style={{ display: 'inline-block' }}><div data-testid="singleTripStartDate">{data.startDate} - </div> 
            <div data-testid="singleTripEndDate">{data.endDate}</div></span>
        </div>
    );
}