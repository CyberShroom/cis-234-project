import { useState } from 'react'
import Note from './Note';

function List(props)
{
    return (
    <div id="content">
        <ul id="note-list">
          {props.noteList.map((item) => (
            <Note />
          ))}
        </ul>
    </div>
  );
}

export default List;