export default function SingleTripItem (props) {
    if (!props.data?._id) {
        return null;
    }
    const { data } = props;

    return(
        <div key={data._id}>
            <h2>{data.location}</h2>
            <p>{data.startDate}</p> 
            <p>{data.endDate}</p>
        </div>
    );
}