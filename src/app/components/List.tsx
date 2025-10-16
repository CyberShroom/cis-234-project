'use client'
import { useState } from 'react'
import '../styles/list.css'
import { Container, Row } from 'react-bootstrap';

function List(props)
{
    //This function runs logic to determine which kind of list item to create.
    const handleCreation = (item) => {
      //If the type is note, create a note, otherwise, create a task.
      if(item.type === "note")
      {
        return createNote(item);
      }
      else
      {
        return createTask(item);
      }
    }

    //Returns the li needed for a note entry.
    function createNote(item)
    {
      return(
        <li key={item.id}>
          {item.content}
        </li>
      );
    }

    //Returns the li needed for a task entry.
    function createTask(item)
    {
      return(
        <li key={item.id}>
          <input type="checkbox"/>
          {item.content}
        </li>
      );
    }

    return (
      <Row id='row5'>
        <div id="content-home">
          <ul>
            {props.noteList.map((item) => (
              handleCreation(item)
            ))}
          </ul>
        </div>
      </Row>
    );
}

export default List;