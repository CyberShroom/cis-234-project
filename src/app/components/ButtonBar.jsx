'use client'
import { useState } from 'react'
import { Button, Row, Stack } from 'react-bootstrap';
import '../styles/buttonbar.css'

function ButtonBar(props)
{
    function resetBar()
    {
        props.noteState(false);
        props.taskState(false);
    }

    function checkReqs()
    {
        if (!props.titleReference.trim()) 
        {
            props.alert('Title is required.', 'danger')
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

            //First, check if the user is editing a note.
            if(props.editId >= 0) {
                props.callEdit("finish");
                resetBar()
                return;
            }

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
            props.noteState(true);
        }
    }

    //Function ran by the task button.
    const handleTaskClick = () => {
        if(props.currentTaskState === true || props.currentNoteState === true)
        {
            //First, check if the user is editing a note.
            if(props.editId >= 0) {
                props.callEdit("cancel");
            }

            //don't push the input.
            resetBar();
        }
        else
        {
            props.taskState(true);
        }
    }

    function getNoteVariant() {
        if(props.currentTaskState || props.currentNoteState) {
            return "success";
        }
        else
        {
            return "primary";
        }
    }

    function getTaskVariant() {
        if(props.currentTaskState || props.currentNoteState) {
            return "danger";
        }
        else
        {
            return "primary";
        }
    }

    function getNoteText() {
        if(props.currentTaskState || props.currentNoteState) {
            return "Finish";
        }
        else
        {
            return "Create Note";
        }
    }

    function getTaskText() {
        if(props.currentTaskState || props.currentNoteState) {
            return "Cancel";
        }
        else
        {
            return "Create Task";
        }
    }

    return (
        <Row id='row3' className='sticky-top'>
            <Stack className="border p-3 bg-dark justify-content-center" id="button-bar" direction='horizontal' gap={5}>
                <div></div>
                <Button variant={getNoteVariant()} className='stack-button' onClick={handleNoteClick}>{getNoteText()}</Button>
                <Button variant={getTaskVariant()} className='stack-button' onClick={handleTaskClick}>{getTaskText()}</Button>
                <div></div>
            </Stack>
        </Row>
  );
}

export default ButtonBar;