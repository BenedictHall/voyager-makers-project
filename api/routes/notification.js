
const express = require("express");
const NotificationController = require("../controllers/notification");

const router = express.Router();

router.get("/:userId", NotificationController.getAllNotifications);
router.get("/:userId/unread", NotificationController.getUnreadNotificationsCount);

module.exports = router;