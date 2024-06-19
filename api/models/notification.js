const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    message: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    isRead: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    toDoId: { type: mongoose.Schema.Types.ObjectId, ref: "ToDo" }
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;