'use client'
import { useState } from 'react'
import { Container, Row, Form } from 'react-bootstrap'
import '../styles/create.css'

function Create(props)
{
    //Only display a due date for tasks.
    function displayDate()
    {
        //If noteState is true, then don't display a date.
        if(props.noteState === true)
        {
            return null;
        }
        else
        {
            //Return the date input for a task.
            return (
                <Form.Control
                    id='input-date'
                    type="date"
                    value={props.dateReference}
                    onChange={props.inputDateHandler}
                />
            );
        }
    }

    //If either state is true, draw the note creation div.
    if(props.noteState === true || props.taskState === true)
    {
        return (
            <Row id='row4' className='sticky-top'>
                <Form>
                    <Form.Control
                        id='input-title'
                        type="text"
                        placeholder='Type your title here...'
                        value={props.titleReference}
                        onChange={props.inputTitleHandler}
                    />
                    <Form.Control
                        id='input'
                        type="text"
                        as="textarea"
                        placeholder='(optional) Type your content here...'
                        value={props.textReference}
                        onChange={props.inputTextHandler}
                    />
                    {displayDate()}
                </Form>
            </Row>
        );
    }
    else //Otherwise, dont draw the div.
    {
        return null;
    }
}

export default Create;