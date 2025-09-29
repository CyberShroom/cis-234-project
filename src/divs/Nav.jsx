import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Nav()
{
    //Allows using buttons to control navigation rather than the built in nav of react-router-dom.
    const navigate = useNavigate();

    return (
    <div id="nav">
        <Button variant='primary' onClick={() => navigate('/')}>Home</Button>
        <Button variant='primary' onClick={() => navigate('/about')}>About</Button>
        <Button variant='primary' onClick={() => navigate('/contact')}>Contact</Button>
    </div>
  );
}

export default Nav;