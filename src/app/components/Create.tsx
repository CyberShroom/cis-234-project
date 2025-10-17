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
            <Row id='row4' className='sticky-top'>
                <div id='create'>
                    <input id="input-title" placeholder='Type your title here...' value={props.titleReference} onChange={props.inputTitleHandler}/>
                    <textarea id="input" placeholder='Type your content here...' value={props.textReference} onChange={props.inputTextHandler}/>
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