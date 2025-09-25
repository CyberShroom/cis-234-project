import { useState } from 'react'
import './index.css'
import Top from './divs/Top';
import Nav from './divs/Nav';
import List from './divs/List';
import Create from './divs/Create';

function App() {
  const [count, setCount] = useState(0)

  const [isWritingNote, setIsWritingNote] = useState(false);
  const [isWritingTask, setIsWritingTask] = useState(false);
  
  const setNoteState = (noteState) => {
    console.log("Setting note state to:", noteState);
    setIsWritingNote(noteState);
  }

  const setTaskState = (taskState) => {
    console.log("Setting task state to:", taskState);
    setIsWritingTask(taskState);
  }


  function createNote()
  {
    const noteList = document.getElementById('note-list');
  }

  return (
    <>
      <div id="grid-div">
        <Top />
        <div id="header">

        </div>
        <div id="left">

        </div>
        <div id="right">

        </div>
        <Nav noteState={setNoteState} currentNoteState={isWritingNote} taskState={setTaskState} currentTaskState={isWritingTask}/>
        <List />
        <Create noteState={isWritingNote} taskState={isWritingTask}/>
        <div id="footer">

        </div>
      </div>
    </>
  );
}

export default App
