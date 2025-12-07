'use client'
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import List from './components/List';
import Note from './components/Note';
import Create from './components/Create';
import ButtonBar from './components/ButtonBar';
import Status from './components/Status';
import { Row, Form} from 'react-bootstrap';
import Auth from './components/Auth';

export default function HomePage() {
      //State to hold user information
      const [user, setUser] = useState(null);

      //The array that contains all the notes.
      const [noteList, setNoteList] = useState([]);
      //State used to determine if there was an update to the users data.
      const [previousData, setPreviousData] = useState([]);

      //Fetch values from supabase
      const [initialFetch, setInitialFetch] = useState(false);
      useEffect(() => {
        //If the initial fetch has not run successfully and user is not null
        if(!initialFetch && user)
        {
          fetchNoteList(user.id);
          setInitialFetch(true);

          console.log("Initial Fetch Completed Successfully.");
        }
      });
      async function fetchNoteList(id) 
      {
        const { data } = await supabase.from("Tasks").select().order("entry_number", {ascending:true}).eq('user_id', id);
        setNoteList(data);

        //No entries will result in errors. Return instead.
        if(data.length == 0) return;

        setEntryNumber(data[data.length - 1].entry_number + 1);
        
        //Update the display if the new data that was fetched does not match the data of the last fetch.
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
        console.log(user.id);
        const {data, error} = await supabase.from("Tasks").insert([{content:newEntry, type:newType, title:newTitle, date:newDate, entry_number:newEntryNumber, user_id: user.id}]);
        if(error) 
        {
          sendAlert("Failed to insert row: " + error.message, "danger");
        }
        //Refresh the list
        else {
          sendAlert("Insert was successful.", "success");
          fetchNoteList(user.id);
        }
      }
      //Update a row in supabase
      async function updateRow(noteID, newChecked, id)
      {
        const {data, error} = await supabase.from("Tasks").update({is_checked:newChecked}).eq('id', noteID).eq('user_id', id).select();
        if(error)
        {
           sendAlert("Failed to update row: " + error.message, "danger");
        }
        //Refresh the list.
        else {
          sendAlert("Update was successful.", "success");
          fetchNoteList(id);
        }
      }
      //Edit the text of a note in supabase
      async function editRow(noteID, newText, newTitle, id) {
        const {data, error} = await supabase.from("Tasks").update({content:newText, title:newTitle}).eq('id', noteID).eq('user_id', id).select();
        if(error)
        {
           sendAlert("Failed to edit text: " + error.message, "danger");
        }
        //Refresh the list.
        else {
          sendAlert("Edit was successful.", "success");
          fetchNoteList(id);
        }
      }
      async function deleteRow(noteID, id) {
        const {data, error} = await supabase.from("Tasks").delete().eq('id', noteID).eq('user_id', id).select();
        if(error) {
          sendAlert("Failed to delete note: " + error.message, "danger");
        }
        else {
          sendAlert("Note deleted successfully.", "success");
          fetchNoteList(id);
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

      //State to hold the search term
      const [searchTerm, setSearchTerm] = useState("");

      //State to track if a note is being edited
      const [editNumber, setEditNumber] = useState(-1);
      
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

      //Setter for user
      const setUserFromAuth = (newUser) => {
        setUser(newUser);
      };

      //Sets the edit id and tells the create component to draw.
      const startEdit = (id, type, content, title, date) => {
        //Dont edit another note while one is being edited.
        setEditNumber((prev) => {
          if(prev > 0) {
            sendAlert("A note is already being edited.", "warning");
            return prev;
          }
          else {
            //Draw based on the type of note
            if(type == "note") {
              setNoteState(true);
              setInputTitle(title);
              setInputText(content);
            }
            else
            {
              setTaskState(true);
              setInputTitle(title);
              setInputText(content);
              setInputDate(date);
            }
            return id;
          }
        });
      }

      const endEdit = (command) => {
        if(command == "finish") {
          //Call supabase and edit the notes text
          //Replace the old value (Updates the client side)
          let newList = noteList.map((item) => (item.entry_number == editNumber ? {...item, content:inputText, title:inputTitle, success:false} : item));
          let noteID = noteList.find(item => item.entry_number == editNumber).id;

          setNoteList(newList);
          updateDisplay(newList);

          //Update the supabase row to reflect the change
          editRow(noteID, inputText, inputTitle, user.id);

          setInputText('');
          setInputTitle('');
          setInputDate('');
          setEditNumber(-1);
        }
        else if(command == "cancel") {
          //Reset the edit state and close the create component.
          setInputText('');
          setInputTitle('');
          setInputDate('');
          setEditNumber(-1);
        }
        else {
          sendAlert("Unknown command recieved. Edit attempt will fail!", "danger");
        }
      }

      const deleteNote = (id) => {
        deleteRow(id, user.id)
      }

      //Sets the search term and updates the display with only notes that match
      const searchForNotes = (search) => {
        setSearchTerm(search);

        //Filter the notes list.
        //This is the server version. The final application will run client side filtering instead.
        //searchForNotesServer(search);

        //client side filtering.
        let searchNotes = noteList.filter((item) => (item.title.toLowerCase().includes(search.toLowerCase())));

        if(searchNotes.length == 0) {
          sendAlert("No notes matched the search term.", "warning");
        }

        updateDisplay(noteList);
      };
      //Server Version for the assignment.
      async function searchForNotesServer(search) {
        //Fetch from supabase
        const { data, error } = await supabase.from("Tasks").select().order("entry_number", {ascending:true}).eq('user_id', user.id).ilike("title", `%${search}%`);

        //error checking
        if(error) {
          console.error("Error fetching notes: ", error.message);
          sendAlert("Error fetching notes: ", error.message, "danger");
        }
        else {
          //Set the note list state with only the searched terms
          setNoteList(data);

          //Do not continue if there is no data
          if(data.length == 0) {
            sendAlert("No notes matched the search term.", "warning");
          }

          //Update the display. DO NOT SET THE ENTRY NUMBER!!!
          updateDisplay(data);
        }
      }
    
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

  //updates the display state for the list component.
  function updateDisplay(list)
  {
    //Check that the list matches the search term in case this is called after updating supabase
    list = list.filter((item) => (item.title.toLowerCase().includes(searchTerm.toLowerCase())));

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
  }

  //Creates a note component from a note entry
    function createNote(item)
    {
      return(
        <Note 
          item={item} 
          key={item.id ? item.id : crypto.randomUUID()}
          checkHandler={onNoteCheck}
          edit={startEdit}
          delete={deleteNote}
        />
      );
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
      updateRow(noteID, isChecked, user.id);
    }

  const sendAlert = (message, variant) => {
    console.log(message);
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
    
    return(
      <main id="home">
          <Auth
            userHandler={setUserFromAuth}
          />
          <ButtonBar 
            noteState={setNoteState} 
            currentNoteState={isWritingNote} 
            taskState={setTaskState} 
            currentTaskState={isWritingTask} 
            noteList={addNoteToList}
            titleReference={inputTitle}
            alert={sendAlert}
            editId={editNumber}
            callEdit={endEdit}
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
          {user ? 
          <Form.Control
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => searchForNotes(e.target.value)}
            className="mb-1 my-1 border-5 border-primary"
          />
          : null}
          {user ? <List display={display}/> : <h2>Loading User Data...</h2>}
          <Status 
            message={alertMessage}
            status={showAlert}
            variant={alertVariant}
          />
      </main>
    );
}