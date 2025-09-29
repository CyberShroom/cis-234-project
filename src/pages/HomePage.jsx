import { useState } from 'react';
import Top from '../divs/Top';
import Nav from '../divs/Nav';
import List from '../divs/List';
import Create from '../divs/Create';

function HomePage() {
    //The array that contains all the notes.
      const [noteList, setNoteList] = useState([]);
    
      //Booleans that determine whether a note or task is being created.
      const [isWritingNote, setIsWritingNote] = useState(false);
      const [isWritingTask, setIsWritingTask] = useState(false);
    
      //Used when making new notes to determine the entry number.
      const [latestEntryNumber, setEntryNumber] = useState(0);
      
      //Setter for isWritingNote
      const setNoteState = (noteState) => {
        setIsWritingNote(noteState);
      }
    
      //Setter for is WritingTask
      const setTaskState = (taskState) => {
        setIsWritingTask(taskState);
      }
    
      //Adds a note to the array of notes.
      const addNoteToList = (newEntry, type) => {
        console.log("Adding new note to the list.");
    
        setNoteList([...noteList, {text:newEntry, entryNumber:latestEntryNumber + 1, type:type, id:crypto.randomUUID()}]);
        setEntryNumber(latestEntryNumber + 1);
      }
    
    return(
        <>
            <div id="grid-div">
                <Top />
                <div id="header">

                </div>
                <div id="left">

                </div>
                <div id="right">

                </div>
                <Nav noteState={setNoteState} currentNoteState={isWritingNote} taskState={setTaskState} currentTaskState={isWritingTask} noteList={addNoteToList}/>
                <List noteList={noteList}/>
                <Create noteState={isWritingNote} taskState={isWritingTask}/>
                <div id="footer">

                </div>
            </div>
    </>
    );
}

export default HomePage;