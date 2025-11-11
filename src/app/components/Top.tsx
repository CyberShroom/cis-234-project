'use client'
import '../styles/top.css';
import { Button } from 'react-bootstrap';

function Top()
{
    return (
    <div id='top'>
        <p id='top-text'>Task App</p>
        <Button>Logout</Button>
    </div>
  );
}

export default Top;