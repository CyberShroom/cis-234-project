'use client'
import { Button, Stack } from 'react-bootstrap';
import Link from 'next/link';
import '../styles/nav.css'

function Nav()
{
    return (
        <Stack className="border p-3 bg-dark justify-content-center" id="nav" direction='horizontal' gap={5}>
            <div></div>
            <Link href="/" className='nav-link'><Button variant='info' className='stack-button'>Home</Button></Link>
            <Link href="/about" className='nav-link'><Button variant='outline-info' className='stack-button'>About</Button></Link>
            <Link href="/contact" className='nav-link'><Button variant='outline-info' className='stack-button'>Contact</Button></Link>
            <Link href="/faq" className='nav-link'><Button variant='outline-info' className='stack-button'>FAQ</Button></Link>
            <div></div>
        </Stack>
    );
}

export default Nav;