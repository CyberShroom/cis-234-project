'use client'
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import List from './components/List';
import Note from './components/Note';
import Create from './components/Create';
import ButtonBar from './components/ButtonBar';
import Status from './components/Status';
import { Row } from 'react-bootstrap';

export default function HomePage() {
      //The array that contains all the notes.
      const [noteList, setNoteList] = useState([]);
      //State used to determine if there was an update to the users data.
      const [previousData, setPreviousData] = useState([]);

      //Fetch values from supabase
      const [initialFetch, setInitialFetch] = useState(false);
      useEffect(() => {
        if(initialFetch === false)
        {
          fetchNoteList();
          setInitialFetch(true);
        }
      });
      async function fetchNoteList() 
      {
        const { data } = await supabase.from("Tasks").select().order("entry_number", {ascending:true});
        setNoteList(data);
        setEntryNumber(data[data.length - 1].entry_number + 1);
        if(data.toString() != previousData.toString())
        {
          setPreviousData(data);
          //Update the display with the data that was fetched.
          updateDisplay(data);
        }
      }
      //Add a row to supabase
      async function addRow(newEntry, newType, newTitle, newDate, newEntryNumber)
      {
        const {data, error} = await supabase.from("Tasks").insert([{content:newEntry, type:newType, title:newTitle, date:newDate, entry_number:newEntryNumber}]);
        if(error) 
        {
          sendAlert("Failed to insert row: " + error.message, "danger");
        }
        //Refresh the list
        else {
          sendAlert("Insert was successful.", "success");
          fetchNoteList();
        }
      }
      //Update a row in supabase
      async function updateRow(noteID, newChecked)
      {
        const {data, error} = await supabase.from("Tasks").update({is_checked:newChecked}).eq('id', noteID).select();
        if(error) console.error("Update error:", error.message);
        //Refresh the list.
        else {
          fetchNoteList();
        }
      }
      
      //Booleans that determine whether a note or task is being created.
      const [isWritingNote, setIsWritingNote] = useState(false);
      const [isWritingTask, setIsWritingTask] = useState(false);
    
      //Used when making new notes to determine the entry number.
      const [latestEntryNumber, setEntryNumber] = useState(1);

      //A state to hold the text of the input text area
      const [inputText, setInputText] = useState('');
      //A state to hold the text of the input title area
      const [inputTitle, setInputTitle] = useState('');
      //A state to hold the date of the due date area
      const [inputDate, setInputDate] = useState('');

      //Used by the List component. Contains the html that needs to be displayed to the user.
      const [display, setDisplay] = useState([]);

      //The message the alert box will display
      const [alertMessage, setAlertMessage] = useState('');
      //Whether the alert box should display
      const [showAlert, setShowAlert] = useState(false);
      //The variant for the alert box to use
      const [alertVariant, setAlertVariant] = useState("error")
      
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

      //Setter for input title
      const setInputTitleFromEvent = (event) => {
        setInputTitle(event.target.value);
      };

      //Setter for input date
      const setInputDateFromEvent = (event) => {
        setInputDate(event.target.value);
      };
    
      //Adds a note to the array of notes.
      const addNoteToList = (type) => {
        console.log("Adding new note to the list.");

        let dateToPush = null;
        //Dont push the date if we're making a note
        if(type != "note" && inputDate != '')
        {
          dateToPush = inputDate;
        }
    
        //Add a client side note.
        setNoteList([...noteList, {content:inputText, entryNumber:latestEntryNumber + 1, type:type, title:inputTitle, id:crypto.randomUUID(), date:dateToPush, success:false, entry_number:latestEntryNumber}]);
        //update the entry number
        setEntryNumber(latestEntryNumber + 1);

        //Add note to the display
        updateDisplay([...noteList, {content:inputText, entryNumber:latestEntryNumber + 1, type:type, title:inputTitle, id:crypto.randomUUID(), date:dateToPush, success:false, entry_number:latestEntryNumber}]);

        //Add the note to supabase
        addRow(inputText, type, inputTitle, dateToPush, latestEntryNumber);
        setInputText('');
        setInputTitle('');
        setInputDate('');
      }

    //This is ran when the user checks a task complete or incomplete.
    const onNoteCheck = (noteID, isChecked) => {
      //Replace the old value (Updates the client side)
      setNoteList((prev) => {
        let newList = prev.map((item) => (item.id == noteID ? {...item, is_checked:isChecked, success:false} : item));
        updateDisplay(newList);
        return newList;
      });

      //Update the supabase row to reflect the change
      updateRow(noteID, isChecked);
    }

  //updates the display state for the list component.
  function updateDisplay(list)
  {
    //List of row elements
    let rowList = [];
    //Used by the for loop to contain all children of the row
    let childList = [];

    //Run this for each note entry
    for(let count = 0; count < list.length; count++)
    {
      //Ensure each row only contains 3 entries
      if(count % 3 == 0 && count != 0)
      {
        addRow();
      }

      //Add the note entry to the child list
      childList.push(list[count]);

      //If we're at the end of the list, push the final row early.
      if(count == list.length - 1 && childList.length > 0)
      {
        //Create fake entries to ensure consistent spacing.
        while(childList.length < 3)
        {
          childList.push('');
        }
        addRow();
      }
    }

    //Update the display state
    setDisplay(rowList);

    //Adds the row to the list and resets the child list
    function addRow()
    {
      rowList.push(
        <Row key={crypto.randomUUID() }>
          {childList.map((item) => (
            createNote(item)
          ))}
        </Row>);

      childList = [];
    }

    //Creates a note component from a note entry
    function createNote(item)
    {
      return(
        <Note 
          item={item} 
          key={item.id ? item.id : crypto.randomUUID()}
          checkHandler={onNoteCheck}
        />
      );
    }
  }

  function sendAlert(message, variant)
  {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }
    
    return(
      <main id="home">
          <ButtonBar 
            noteState={setNoteState} 
            currentNoteState={isWritingNote} 
            taskState={setTaskState} 
            currentTaskState={isWritingTask} 
            noteList={addNoteToList}
            titleReference={inputTitle}
          />
          <Create 
            noteState={isWritingNote} 
            taskState={isWritingTask} 
            textReference={inputText} 
            titleReference={inputTitle}
            dateReference={inputDate}
            inputTextHandler={setInputTextAreaFromEvent}
            inputTitleHandler={setInputTitleFromEvent}
            inputDateHandler={setInputDateFromEvent}
          />
          <List 
            display={display}
          />
          <Status 
            message={alertMessage}
            status={showAlert}
            variant={alertVariant}
          />
      </main>
    );
}