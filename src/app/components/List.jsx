'use client'
import '../styles/list.css'
import { Row, Col } from 'react-bootstrap';

function List(props)
{
  return (
    <Row id='row5' className='bg-light'>
      <div id="content-home">
        <Col>
          {props.display}
        </Col>
      </div>
    </Row>
  );
}

export default List;