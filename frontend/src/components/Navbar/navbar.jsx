
import { useState } from "react";
import { NavLink , Link, useNavigate, useLocation} from "react-router-dom";
import "../../../css/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");
    
    if (location.path === "/login"){
        return null;
    }

    const handleLogout = () =>{
            localStorage.removeItem("token");
            navigate("/login")

        };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);};

    const handleSubmit = (event) =>{
        event.preventDefault()

    }
    

    return (
        <nav className="navbar" id="navbar">
            <div>
                <Link to="/dashboard" className="link">
                    <p>Voyager</p>
                </Link>
            </div>
            <div className = "navbar-left">
                <form onSubmit = {handleSubmit}>
                <input className="searchbar" type="text" placeholder="Search.." value={search} onChange={handleSearchChange}></input>
                </form>

            </div>
            <div className= "navbar-right">
                
                    <NavLink to = {"/trips"} className="link">Trips</NavLink>
                    <Link to = {"/todo"} className="link">My To Do</Link>
                    <Link to = {"/budget"} className="link">My Budget</Link>
                    <div className="menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                <button onClick={handleLogout}>Log out </button>
            </div>
        </nav>
    )        
};
export default Navbar;