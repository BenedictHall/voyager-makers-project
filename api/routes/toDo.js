const express = require("express");
const ToDosController = require("../controllers/toDos");
const router = express.Router();

router.get("/toDos", ToDosController.getAllToDos);
router.post("/toDos", ToDosController.createToDo);
router.delete("/toDos", ToDosController.deleteToDo);
router.put("/toDos", ToDosController.toggleCompleteToDo);

module.exports = router;