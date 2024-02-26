const Router = require("express");
const router = Router()

const {createtodo, gettodo, deletetodo, updatetodo} = require("../controllers/todo")

router.post('/todo', createtodo)
router.get('/gettodo',gettodo)
router.post('/deletetodo', deletetodo)
router.post("/edittodo", updatetodo)
module.exports = router