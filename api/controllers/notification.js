const Notification = require("../models/notification.js");

const getAllNotifications = async (req, res) => {
    const notifications = await Notification.find({
        userId: req.params.userId,
    });

    const unreadNotificationIds = notifications
        .filter(notification => !notification.isRead)
        .map(notification => notification.id);

    Notification.updateMany({ _id: { $in: unreadNotificationIds }}, { isRead: true });
    res.status(200).json({ notifications });
};

const getUnreadNotificationsCount = async (req, res) => {
    const count = await Notification.count({ isRead: false, userId: req.params.userId });
    res.status(200).json({ count });
};

const markNotificationsAsRead = async (req, res) => {
    await Notification.updateMany({ isRead: false, userId: req.params.userId }, { isRead: true });
    res.status(200).send();
};

const NotificationsController = {
    getUnreadNotificationsCount: getUnreadNotificationsCount,
    getAllNotifications: getAllNotifications,
    markNotificationsAsRead: markNotificationsAsRead,
}

module.exports = NotificationsController;