import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/signup">SignUp</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/recoverpass">RecoverPassword</Link>
                        </li>
                        <li>
                            <Link to="/store">Store</Link>
                        </li>
                        <li>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;