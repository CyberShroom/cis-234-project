'use client'
import { useState } from 'react'

function Create(props)
{
    //If either state is true, draw the note creation div.
    if(props.noteState === true || props.taskState === true)
    {
        return (
            <div id='make-new-note'>
                <textarea id="note-input" placeholder='Type here...' value={props.textReference} onChange={props.inputTextHandler}/>
            </div>
        );
    }
    else //Otherwise, dont draw the div.
    {
        return null;
    }
}

export default Create;