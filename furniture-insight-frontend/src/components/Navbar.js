import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import './Navbar.css';
import { Button } from './Button';

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
      if(window.innerWidth <= 960) {
          setButton(false);
      } else {
          setButton(true);
      }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Furniture Insight <i className='fab fa-typo3' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fas-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/Store' className='nav-links' onClick={closeMobileMenu}>
                            Store
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/SmartRoom' className='nav-links' onClick={closeMobileMenu}>
                            Smart Room
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/ShoppingCart' className='nav-links' onClick={closeMobileMenu}>
                            Shopping Cart
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/AboutUs' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to='/SignUp' className='nav-links' onClick={closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
            </div>
        </nav>
    </>
  )
}

export default Navbar