'use client'
import { useState } from 'react'
import { Button, Row, Stack } from 'react-bootstrap';
import '../styles/buttonbar.css'

function ButtonBar(props)
{
    //Default values for the buttons
    const defaultNoteText = "Create Note";
    const defaultTaskText = "Create Task";

    //The text of the buttons.
    const [noteText, setNoteText] = useState(defaultNoteText);
    const [taskText, setTaskText] = useState(defaultTaskText);

    //The variant of the buttons
    const [noteVariant, setNoteVariant] = useState('primary');
    const [taskVariant, setTaskVariant] = useState('primary');

    //Function ran by the note button.
    const handleNoteClick = () => {
        if(props.currentNoteState === true || props.currentTaskState === true)
        {
            if(props.currentTaskState === false)
            {
                props.noteList("note");
            }
            
            setNoteText(defaultNoteText);
            setTaskText(defaultTaskText);
            setNoteVariant("primary");
            setTaskVariant("primary");
            props.noteState(false);
            props.taskState(false);
        }
        else
        {
            setNoteText("Finish");
            setNoteVariant("success");
            setTaskText("Cancel");
            setTaskVariant("danger");
            props.noteState(true);
        }
    }

    //Function ran by the task button.
    const handleTaskClick = () => {
        if(props.currentTaskState === true || props.currentNoteState === true)
        {
            if(props.currentNoteState === false)
            {
                props.noteList("task");
            }

            setNoteText(defaultNoteText);
            setTaskText(defaultTaskText);
            setNoteVariant("primary");
            setTaskVariant("primary");
            props.noteState(false);
            props.taskState(false);
        }
        else
        {
            setNoteText("Cancel");
            setNoteVariant("danger");
            setTaskText("Finish");
            setTaskVariant("success");
            props.taskState(true);
        }
    }

    return (
        <Row id='row3' className='sticky-top'>
            <Stack className="border p-3 bg-dark justify-content-center" id="button-bar" direction='horizontal' gap={5}>
                <div></div>
                <Button variant={noteVariant} className='stack-button' onClick={handleNoteClick}>{noteText}</Button>
                <Button variant={taskVariant} className='stack-button' onClick={handleTaskClick}>{taskText}</Button>
                <div></div>
            </Stack>
        </Row>
  );
}

export default ButtonBar;