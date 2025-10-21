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

    function resetBar()
    {
        //Reset buttonbar.
        setNoteText(defaultNoteText);
        setTaskText(defaultTaskText);
        setNoteVariant("primary");
        setTaskVariant("primary");
        props.noteState(false);
        props.taskState(false);
    }

    function changeBar()
    {
        //change the bar for use with create component.
        setNoteText("Finish");
        setNoteVariant("success");
        setTaskText("Cancel");
        setTaskVariant("danger");
    }

    function checkReqs()
    {
        if (!props.titleReference.trim()) 
        {
            alert('Title is required.');
            return false;
        }
        else
        {
            return true;
        }
    }


    //Function ran by the note button.
    const handleNoteClick = () => {
        //If the create component is currently being drawn-
        if(props.currentNoteState === true || props.currentTaskState === true)
        {
            //Ensure title and other required input is present.
            if(checkReqs() == false) return;

            //Add the input to the list of notes
            if(props.currentNoteState === true)
            {
                props.noteList("note");
            }
            else
            {
                props.noteList("task");
            }
            
            resetBar();
        }
        else
        {
            changeBar();
            props.noteState(true);
        }
    }

    //Function ran by the task button.
    const handleTaskClick = () => {
        if(props.currentTaskState === true || props.currentNoteState === true)
        {
            //don't push the input.
            resetBar();
        }
        else
        {
            changeBar();
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