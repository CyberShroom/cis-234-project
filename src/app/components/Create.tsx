'use client'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import '../styles/create.css'

function Create(props)
{
    //If either state is true, draw the note creation div.
    if(props.noteState === true || props.taskState === true)
    {
        return (
            <Row id='row4'>
                <div id='create'>
                    <textarea id="input" placeholder='Type here...' value={props.textReference} onChange={props.inputTextHandler}/>
                </div>
            </Row>
        );
    }
    else //Otherwise, dont draw the div.
    {
        return null;
    }
}

export default Create;