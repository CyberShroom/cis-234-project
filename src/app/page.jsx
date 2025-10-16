'use client'
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import List from './components/List';
import Create from './components/Create';
import ButtonBar from './components/ButtonBar';

export default function HomePage() {
      //The array that contains all the notes.
      const [noteList, setNoteList] = useState([]);

      //Fetch values from supabase
      useEffect(() => {
        fetchNoteList();
      });
      async function fetchNoteList() 
      {
        const { data } = await supabase.from("Tasks").select();
        setNoteList(data);
      }
      //Add a row to supabase
      async function addRow(newEntry)
      {
        const {data, error} = await supabase.from("Tasks").insert([{content:newEntry}]);
        if(error) console.error("Insert error:", error);
        //Refresh the list. In the future this will not be necessary.
        else {
          fetchNoteList();
        }
      }
      
      //Booleans that determine whether a note or task is being created.
      const [isWritingNote, setIsWritingNote] = useState(false);
      const [isWritingTask, setIsWritingTask] = useState(false);
    
      //Used when making new notes to determine the entry number.
      const [latestEntryNumber, setEntryNumber] = useState(0);

      //A state to hold the text of the input text area
      const [inputText, setInputText] = useState('');
      
      //Setter for isWritingNote
      const setNoteState = (noteState) => {
        setIsWritingNote(noteState);
      }
    
      //Setter for is WritingTask
      const setTaskState = (taskState) => {
        setIsWritingTask(taskState);
      }

      //Setter for input text area
      const setInputTextAreaFromEvent = (event) => {
        setInputText(event.target.value);
      };
    
      //Adds a note to the array of notes.
      const addNoteToList = (type) => {
        console.log("Adding new note to the list.");
    
        //Add a client side note. In the future, an icon should display to show if it has loaded in supabase. That way the list does not need to be refreshed.
        setNoteList([...noteList, {text:inputText, entryNumber:latestEntryNumber + 1, type:type, id:crypto.randomUUID()}]);
        setEntryNumber(latestEntryNumber + 1);

        //Add the note to supabase
        addRow(inputText);
        setInputText('');
      }
    
    return(
      <main id="home">
          <ButtonBar 
            noteState={setNoteState} 
            currentNoteState={isWritingNote} 
            taskState={setTaskState} 
            currentTaskState={isWritingTask} 
            noteList={addNoteToList}
          />
          <Create 
            noteState={isWritingNote} 
            taskState={isWritingTask} 
            textReference={inputText} 
            inputTextHandler={setInputTextAreaFromEvent}
          />
          <List 
            noteList={noteList}
          />
      </main>
    );
}