import { useState } from 'react'

function ButtonBar(props)
{
    //Default values for the buttons
    const defaultNoteText = "Create Note";
    const defaultTaskText = "Create Task";

    //The text of the buttons.
    const [noteText, setNoteText] = useState(defaultNoteText);
    const [taskText, setTaskText] = useState(defaultTaskText);

    //Function ran by the note button.
    const handleNoteClick = () => {
        if(props.currentNoteState === true || props.currentTaskState === true)
        {
            if(props.currentTaskState === false)
            {
                let text = document.getElementById('note-input');

                props.noteList(text.value, "note");
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

    //Function ran by the task button.
    const handleTaskClick = () => {
        if(props.currentTaskState === true || props.currentNoteState === true)
        {
            if(props.currentNoteState === false)
            {
                let text = document.getElementById('note-input');

                props.noteList(text.value, "task");
            }

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
    <div id="button-bar">
        <button id="create-note" type="button" onClick={handleNoteClick}>{noteText}</button>
        <button id="create-task" type="button" onClick={handleTaskClick}>{taskText}</button>
    </div>
  );
}

export default ButtonBar;