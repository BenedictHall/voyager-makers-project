import { useEffect, useState } from "react";
import { getAllNotifications, markNotificationsAsRead } from "../../services/notifications";
import { useNavigate } from "react-router-dom";

export function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');
      
        if (!token || !userId) {
            navigate("/");
            return;
        }

        const response = await getAllNotifications(token, userId);
        setNotifications(response.notifications);
        await markNotificationsAsRead(token, userId);
    }

    return (
        <>
            <h2>Notifications</h2>
            {notifications.map(notification => (
                <div>
                    <h4>{notification.message} {!notification.isRead ? " - Unread" : ""}</h4>
                </div>
            ))}
        </>
    );
}
