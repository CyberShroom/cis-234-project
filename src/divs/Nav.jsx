import { useNavigate } from 'react-router-dom';

function Nav()
{
    //Allows using buttons to control navigation rather than the built in nav of react-router-dom.
    const navigate = useNavigate();

    return (
    <div id="nav">
        <button id="nav-home" type="button" onClick={() => navigate('/')}>Home</button>
        <button id="nav-about" type="button" onClick={() => navigate('/about')}>About</button>
        <button id="nav-contact" type="button" onClick={() => navigate('/contact')}>Contact</button>
    </div>
  );
}

export default Nav;