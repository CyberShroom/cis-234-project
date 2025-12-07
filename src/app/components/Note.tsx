import { Col, Button, Stack } from 'react-bootstrap';
import '../styles/note.css';
import { useState } from 'react';

function Note(props)
{
    //a flag to determine if the text should be struck.
    const [isStrike, setIsStrike] = useState(props.item.is_checked);

    const changeText = (event) => {
        //Set the text strikethrough depending on the check state.
        setIsStrike(event.target.checked);

        props.checkHandler(props.item.id, event.target.checked);
    }

    const handleEditClick = () => {
        props.edit(props.item.entry_number, props.item.type, props.item.content, props.item.title, props.item.date);
    }

    const handleDeleteClick = () => {
        props.delete(props.item.id);
    }

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
                {props.item.type == "note" ? null : <input type="checkbox" onChange={changeText} checked={props.item.is_checked}/>}
                {props.item.success === false ? '❌' : '✅'}
                <p>#{props.item.entry_number}</p>
                <h2 className="page-title">{props.item.title}</h2>
                <p style={{ textDecoration: isStrike ? 'line-through' : 'none'}}>{props.item.content}</p>
                <Stack className="justify-content-center" direction='horizontal'><p>{props.item.date}</p></Stack>
                <Stack className="justify-content-center" direction='horizontal' gap={5}>
                    <Button variant='outline-primary' onClick={handleEditClick}>Edit</Button>
                    <Button variant='outline-danger' onClick={handleDeleteClick}>Delete</Button>
                </Stack>
                <p></p>
            </Col>
        );
    }
}

export default Note;