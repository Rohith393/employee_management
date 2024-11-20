import { NavLink } from "react-router-dom"
import { useAuth } from "../authcontext";
export const Navbarcompoenent=()=>{
    const {isauthenticated,logoutinfo, user} = useAuth();
    console.log('Navbar state:', { isauthenticated, user });
    const logouthandlefunc=()=>{
       logoutinfo();
       console.log("Logout clicked");
    }
    return(
        <div className="navstyles">
             <nav>
             <div className="headingstyle">  <span className="logo-container">
                <img src="login1.png" alt="Logo" className="logo" /> 
            </span></div>
            
            {isauthenticated ?(
                    <>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/homecompoenet">Create Employee</NavLink>
                <NavLink to="/employeelist">employeelist</NavLink>
                <div className="user-info">
                    <span className="username">Welcome {user?.username} . . .</span>
                </div>
                <NavLink 
                            to="/login" 
                            onClick={logouthandlefunc} 
                            className="logout-link"
                        >
                            Logout
                        </NavLink>
                </> )  :            
                ( 
                    <>   
                     <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                ) }
            </nav>
        </div>
    )
}