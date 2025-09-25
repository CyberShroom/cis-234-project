import { useState } from 'react'

function Create(props)
{
    if(props.noteState === true || props.taskState === true)
    {
        return (
            <div id='make-new-note'>
                <textarea className="note-input" placeholder='Type here...'/>
            </div>
        );
    }
    else
    {
        return null;
    }
}

export default Create;