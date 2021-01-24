// Write your "actions" router here!

const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');

router.get('/', (req, res) => {
    Projects.get()
    .then(query => {
        res.status(200).json(query)
    })
    .catch(err => {
        res.status(500).json({err: err.message})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        }
        else {
            res.status(404).json({err: err.message})
        }
    }).catch(err => {
        res.status(404).json({err: err.message})
    })
})


router
    .put('/:id', (req, res)=> {
        const adds = req.body
        const {id} = req.params
        if(!adds.description || !adds.notes || !adds.project_id)
        {
            res.status(404).json({message: err.message })

        } else {
            Projects.update(id, adds)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(err => {
                res.status(500).json({err: err.message})
            })
        }
    })

    router.post('/', (req, res) => {
        const data = req.body
        if(!req.body.project_id || !data.description ||!data.notes)
        res.status(400).json({err: err.message})
        Projects.insert(data)
        .then(actions => {
            res.status(201).json(actions)
        })
        .catch(err => {
            res.status(500).json({err: err.message})
        })
    })

    router.delete('/:id', (req, res) => {
        const data = req.body
        if(!id.id){
            res.status(500).json({err:err.message})
        } else {
            Projects.remove(id.id)
            .then((projects) => {
                res.status(200).json({message:"deleted", projects})
            })
            .catch(err=>{
                res.status(404).json({err:err.message})
            })
        }
    })

module.exports = router;