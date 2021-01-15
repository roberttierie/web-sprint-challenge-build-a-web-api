// Write your "projects" router here!


cconst express = require('express');
const router = express.Router();
const project = require('./projects-model')

router
.get('/', (req, res) => {
    project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        res.status(500).json({ message: error.message});
    })
})


router
.get('/:id', (req, res) => {
    const {id} = req.params.id
    project.get(id)
    .then(projects=>{
        res.status(200).json(projects)
        if(projects){
            res.status(200).json
        } else {
            res.status(404).json({ message: "You have an error"})
        }
    })
    .catch(error => {
        res.status(404).json({ message: error.messsage})
    })
     
})

router
.get('/api/projects/:id/actions', (req,res=> {
    const {id} = req.params
    if(!id.id)
    {res.status(404).json({error:"This id you entered does not work"})}
    project.getProjectActions(id.id)
    .then(projects=>{
        res.status(200).json(projects)})
        .catch(error=>{
            res.status(500).json({message:error.message})
        })
    })
)

router
.post('/api/projects', (req, res) => {
    if(!req.body.name || !req.body.description)
    {res.status(400).json({error:"Need the name and the description"})}
    project.insert(req.body)
    .then(projects=>{
        res.status(201).json(projects)
    })
    .catch(error=>{
        res.status(500).jason({message: error.message})
    })
})

router
.put('/:id', (req,res) => {
    const { id } = req.params.id
    const change = req.body

    project.update(id, change)
    .then(projects => {
        if (req.body.name || req.body.description || req.body.completed) {
            res.status(200).json(projects)
        } else {
            res.status(400).json({})
        }
    })
    .catch(error => {
        res.status(400).json({ message:error.message})
    })
})

router
.delete('/:id', (req, res)=>{
    const id= req.params;
    if(!id.id){
        res.status(500).json({message: 'please enter an id'})
    } else {
        project
        .remove(id.id)
        .then((projects) => {
            res.status(200).json({message: "deleted", projects})
        })
        .catch((error)=>error{
            res.status(404).json({message: 'user cannot be deleted'})
        })
    }
})

module.exports = router;