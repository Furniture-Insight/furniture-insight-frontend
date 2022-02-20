import React from 'react'
import {Link} from 'react-router-dom';

function Navbar() {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo'>
                    Furniture Insight
                </Link>
                <div className='menu-icon'>
                    <i className={click ? 'fas fa-times' : 'fas-bars'} />
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
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar