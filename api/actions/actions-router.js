const express = require('express');
const Actions = require("./actions-model")
// const { validateActionId, validateActionBody } = require('./middleware')
const router = express.Router();


router.get("/api/actions"),((req, res)=> {

    const {query} = req
    Actions
    .get(query)
    .then(actions=> {
        res.json(actions)
    })
    .catch(error=>{
    res.status(500).json({error: "Couldn't retrieve data "})
})
})



router.get('/api/actions/:id', (req, res) => {
    const {id} = req.params
    Actions.get(id)
    .then(actions => {
        if(actions){
            res.status(200).json(actions)
        }
        else{
            res.status(404).json({message: "error with server"})
        }
    })
    .catch(err=>{
        res.status(404).json({message:"error occured with the server"})
    })
});

router
    .post('/api/actions',((req,res) => {
        if(!req.body.project_id || !req.body.description || !req.body.notes){res.status(400).json({error: "Need body in this"})}
        actions.insert(req.body)
        .then(action => { 
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(500).json({message:"error in the server"})
        })
    }))

    
router
    .put("/api/actions/:id",((req, res) => {
        const { id } = req.params
        const change = req.body
        Actions.update(id, change)
        .then(actions => {
            if (req.body.project_id && req.body.description && req.body.notes && req.body.completed){
                res.status(200).json(actions)
            } else { 
                res.status(400).json({message:"server has an error"})
            }
        })
        .catch(error => {
            res.status(400).json({ message: "server has an error"})
        });
    }));

    module.exports = router;
