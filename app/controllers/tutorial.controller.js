const db = require("../models")
const Tutorial = db.tutorials

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request from front-end
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" })
        return
    }

    // Create a Tutorial
    const tutorial = new Tutorial ({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    })

    // Save Tutorial in the database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while creating the Tutorial."
            })
        })

}


// Retrieve all Tutorials from db
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"} } : {}

    Tutorial.find(condition)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some erro occurred while retrieving tutorials."

            })

        })

}


// Find tutorial by id 
exports.findOne = (req, res) => {
    const id = req.params.id

    Tutorial.findById(id)
        .then(data => {
            if(!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id})
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id= " + id})
        })

}


// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published : true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials"
            })
        })
    
}


// Update Tutorial by id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }

    const id = req.params.id

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!"
                })
            } else res.send({ message: "Tutorial was updated successfully."})
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id= " + id
            })
        })

}


// Delete Tutorial by id
exports.delete = (req, res) => {
    const id = req.params.id

    Tutorial.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: "Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!"
                })
            } else {
                res.send({
                    message: "Tutorial was deleted successfully."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            })
        })

}


// Delete All Tutorials from db
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({
                message: "${data.deletedCount} Tutorials were deleted successfully!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            })
        })

}

// GET - /tutoriais
// POST - /tutoriais
// DELETE - /tutoriais/1
// PATCH - /tutoriais/1/publish

// PUT -> replace tutoriais/id_do_item
// PATCH -> substituir o nome