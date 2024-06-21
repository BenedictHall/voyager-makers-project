const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    isCompleted: { type: Boolean, required: true },
    isNotified: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" }
});

const ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;