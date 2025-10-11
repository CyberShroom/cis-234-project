'use client'
import { Button, Stack } from 'react-bootstrap';
import Link from 'next/link';

function Nav()
{
    return (
        <Stack className="border p-3 bg-dark" id="nav" direction='horizontal' gap={5}>
            <div></div>
            <Link href="/"><Button variant='primary'>Home</Button></Link>
            <Link href="/about"><Button variant='primary'>About</Button></Link>
            <Link href="/contact"><Button variant='primary'>Contact</Button></Link>
            <div></div>
        </Stack>
    );
}

export default Nav;