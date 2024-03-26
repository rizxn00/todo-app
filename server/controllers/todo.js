const TodoModel = require('../models/todo')

module.exports.createtodo = (req, res) => {
    const { todo } = req.body

    TodoModel.create({ todo: todo })
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.gettodo = (req, res) => {
    TodoModel.find()
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.deletetodo = (req, res) => {
    const { id } = req.body

    TodoModel.findByIdAndDelete(id)
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.updatetodo = (req, res) => {
    const {id, todo} = req.body
    TodoModel.findByIdAndUpdate(id, {todo:todo})
    .then((data) => {
        res.send(data)
    }).catch((err) => err)
}
