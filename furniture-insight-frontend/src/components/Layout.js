import { Outlet, Link } from "react-router-dom";

function Layout(){
    return(
        <div>       
            <nav>           
                <Link to="/signup">SignUp</Link>
                <Link to="/login">Login</Link>
                <Link to="/recoverpass">RecoverPassword</Link>
            </nav>
            <Outlet/>
        </div>
    )
}

export default Layout;