import { Col } from 'react-bootstrap';
import '../styles/note.css';

function Note(props)
{
    //Check if item is a fake entry or not.
    if(props.item.content == null)
    {
        //The last row may not be full. Fake Cols are created to maintain consistent spacing.
        return(
        <Col className="note-fake mb-1 me-1" >

        </Col>
        );
    }
    else
    {
        //Ternary returns input if the task is a task, or nothing if its a note.
        return(
            <Col className="note-div mb-1 me-1" >
                {props.item.type == "note" ? null : <input type="checkbox"/>}
                <h2 className="page-title">{props.item.title}</h2>
                <p>{props.item.content}</p>
            </Col>
        );
    }
}

export default Note;