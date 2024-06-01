const Router = require("express");
const router = Router()

const {createtodo, gettodo, deletetodo, updatetodo} = require("../controllers/todo")

router.get('/', (req, res) => {
    return res.send("Success")
})
router.post('/todo', createtodo)
router.get('/gettodo',gettodo)
router.post('/deletetodo', deletetodo)
router.post("/edittodo", updatetodo)
module.exports = router