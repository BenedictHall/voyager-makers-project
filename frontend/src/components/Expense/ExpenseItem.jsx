import moment from 'moment'
import { deleteExpense } from '../../services/expense'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const dateFormat = (date) =>{
    return moment(date).format('DD/MM/YYYY')
}

function ExpenseItem (props) {
    const token = props.token;
    const expenseId = props.expense._id;
    const description = props.expense.description;
    const amount = props.expense.amount;
    const date = props.expense.date;
    const category = props.expense.category;

    const handleDeleteExpense = async () => {
        try {
            await deleteExpense(token, expenseId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    }
    

    return(
        <>
                <Container>
                    <Row>
                        
                    {/* <div className="text"> */}
                        <Col>
                        <p>{category}</p>
                        </Col>
                        <Col>
                        <p>{description}</p>
                        </Col>
                        <Col>
                        <p>£{amount}</p>
                        </Col>
                        <Col>
                        <p>{dateFormat(date)}</p>
                        </Col>
                        <Col>
                        <Button onClick={handleDeleteExpense}>Delete</Button>
                        </Col>
                        
                    {/* </div> */}
                    </Row>
                </Container>
        </>
    )
}

export default ExpenseItem