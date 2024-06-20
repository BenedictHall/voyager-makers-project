
import { useEffect, useState } from "react";
import { NavLink , Link, useNavigate} from "react-router-dom";
import "../../../css/navbar.css";
import { getUnreadNotifications } from "../../services/notifications";
export const Navbar = () => {
    const navigate = useNavigate();
    const [notificationsCount, setNotificationsCount] = useState(0);
    useEffect(() => {
        getNotificationCount();
    }, []);

    const handleLogout = () =>{
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login")
        };

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
            
            <div className= "navbar-right">
                
                    <NavLink to = {"/trips"} className="link">Trips</NavLink>
                    <Link to = {"/flights"} className="link">Flights</Link>

                    <Link to = {"/notifications"} className="link">Notifications {notificationsCount ? `(${notificationsCount})` : ""}</Link>
                    <div className="menu">
                        <span></span>
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