import { useState } from 'react'

function Nav(props)
{
    const defaultNoteText = "Create Note";
    const defaultTaskText = "Create Task";

    const [noteText, setNoteText] = useState(defaultNoteText);
    const [taskText, setTaskText] = useState(defaultTaskText);

    const handleNoteClick = () => {
        if(props.currentNoteState === true || props.currentTaskState === true)
        {
            if(props.currentTaskState === false)
            {
                
            }
            
            setNoteText(defaultNoteText);
            setTaskText(defaultTaskText);
            props.noteState(false);
            props.taskState(false);
        }
        else
        {
            setNoteText("Finish");
            setTaskText("Cancel");
            props.noteState(true);
        }
    }

    const handleTaskClick = () => {
        if(props.currentTaskState === true || props.currentNoteState === true)
        {
            setNoteText(defaultNoteText);
            setTaskText(defaultTaskText);
            props.noteState(false);
            props.taskState(false);
        }
        else
        {
            setNoteText("Cancel");
            setTaskText("Finish");
            props.taskState(true);
        }
    }

    return (
    <div id="nav">
        <button id="create-note" type="button" onClick={handleNoteClick}>{noteText}</button>
        <button id="create-task" type="button" onClick={handleTaskClick}>{taskText}</button>
    </div>
  );
}

export default Nav;