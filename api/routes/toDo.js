const express = require("express");
const ToDosController = require("../controllers/toDos");
const router = express.Router();

router.get("/", ToDosController.getAllToDos);
router.post("/", ToDosController.createToDo);
router.delete("/", ToDosController.deleteToDo);
router.put("/", ToDosController.toggleCompleteToDo);

module.exports = router;