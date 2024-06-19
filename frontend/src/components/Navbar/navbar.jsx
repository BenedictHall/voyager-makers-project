
import { useEffect, useState } from "react";
import { NavLink , Link, useNavigate} from "react-router-dom";
import "../../../css/navbar.css";
import { getUnreadNotifications } from "../../services/notifications";
export const Navbar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [notificationsCount, setNotificationsCount] = useState(0);
    useEffect(() => {
        getNotificationCount();
    }, []);

    const handleLogout = () =>{
            localStorage.removeItem("token");
            navigate("/login")
        };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
    }

    const getNotificationCount = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');
      
        if (!token || !userId) {
            return;
        }

        const response = await getUnreadNotifications(token, userId);
        setNotificationsCount(response?.count ?? 0)
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
                    <Link to = {"/todo"} className="link">To Do</Link>
                    <Link to = {"/budget"} className="link">Budget</Link>
                    <Link to = {"/notifications"} className="link">Notifications {notificationsCount ? `(${notificationsCount})` : ""}</Link>
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