const TodoModel = require('../models/todo')

module.exports.createtodo = async(req, res) => {
    const { todo } = req.body

    await TodoModel.create({ todo: todo })
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.gettodo = async(req, res) => {
    await TodoModel.find()
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.deletetodo = async(req, res) => {
    const { id } = req.body

    await TodoModel.findByIdAndDelete(id)
        .then((data) => {
            res.send(data)
        }).catch((err) => err)
}

module.exports.updatetodo = async(req, res) => {
    const {id, todo} = req.body
    await TodoModel.findByIdAndUpdate(id, {todo:todo})
    .then((data) => {
        res.send(data)
    }).catch((err) => err)
}
