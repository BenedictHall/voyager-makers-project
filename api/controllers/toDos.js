const ToDo = require("../models/toDo");
const { generateToken } = require("../lib/token");

const getAllToDos = async (req, res) => {
    const toDos = await ToDo.find().sort({ dueDate: 1 });
    const token = generateToken(req.user_id);
    res.status(200).json({ toDos: toDos, token: token });
};

const createToDo = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;
    const isCompleted = req.body.isCompleted;
    const userId = req.user_id;
    const tripId = req.body.tripId;

    try {
        const toDo = new ToDo({
            title: title, 
            description: description, 
            dueDate: dueDate, 
            isCompleted: isCompleted, 
            userId: userId, 
            tripId: tripId,
        });
        await toDo.save();
        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: "ToDo Created", token: newToken, toDo: toDo });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const toggleCompleteToDo = async (req, res) => {
    const toDoId = req.body.toDoId;
    // const userId = req.user_id; If we ever want to send userId back
    const newToken = generateToken(req.user_id);
    try {
        const toDo = await ToDo.findById(toDoId);
        if (!toDo) {
            return res.status(404).json({ message: "ToDo not found" });
        }
        if (toDo.isCompleted) {
            toDo.isCompleted = false;
            await toDo.save();
            res.status(200).json({ message: "ToDo Incomplete", token: newToken, toDo: toDo });
        } else {
            toDo.isCompleted = true;
            await toDo.save();
            res.status(200).json({ message: "ToDo Completed", token: newToken, toDo: toDo });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const deleteToDo = async (req, res) => {
    const toDoId = req.body.toDoId;
    const newToken = generateToken(req.user_id);
    try {
        const toDo = await ToDo.findById(toDoId);
        if (!toDo) {
            return res.status(404).json({ message: "ToDo not found" });
        }
        await toDo.delete();
        res.status(200).json({ message: "ToDo Deleted", token: newToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Internal server error" });
    }
};

const ToDosController = {
    getAllToDos: getAllToDos,
    createToDo: createToDo,
    toggleCompleteToDo: toggleCompleteToDo,
    deleteToDo: deleteToDo,
};

module.exports = ToDosController;