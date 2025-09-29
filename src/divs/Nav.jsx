import { useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap';

function Nav()
{
    //Allows using buttons to control navigation rather than the built in nav of react-router-dom.
    const navigate = useNavigate();

    return (
        <Stack className="border p-3 bg-dark" id="nav" direction='horizontal' gap={5}>
            <div></div>
            <Button variant='primary' onClick={() => navigate('/')}>Home</Button>
            <Button variant='primary' onClick={() => navigate('/about')}>About</Button>
            <Button variant='primary' onClick={() => navigate('/contact')}>Contact</Button>
            <div></div>
        </Stack>
    );
}

export default Nav;