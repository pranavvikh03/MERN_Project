const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router()
const notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

router.get("/fetchallnotes", fetchuser, async (req,res) => {
    const data = await notes.find({user: req.user.id});
    res.status(200).json(data);
})

router.post("/addNote",fetchuser, [
    body('Title',"Enter Valid Title").isLength({min:3}),
    body('Description',"Enter Valid Description").isLength({min:5})
], async(req, res) =>{
    let errors = validationResult(req)
    if(!errors.isEmpty())
    {
        res.status(400).json({msg:"Enter Valid Data",errors: errors.array()});
    }
    const note = await notes.create({
        title: req.body.Title,
        description: req.body.Description,
        tag: req.body.Tag,
        user: req.user.id
    })

    if(!note){
        res.status(400).send("Error in Note Creation");
    }
    res.status(200).json({msg:"Note Created Succesfully!!",note: note});
})

router.put(`/updateNote/:id`,fetchuser, [
    body('Title',"Enter Valid Title").isLength({min:3}),
    body('Description',"Enter Valid Description").isLength({min:5}),
    body('Tag',"Enter Valid Tag").isLength({min:3})
],async (req, res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send("Invalid Data, Please provide valid data")
    }
    const newNote = {};
    const {Title, Description, Tag} = req.body;
    
    if(Title) { newNote.title = Title; }
    if(Description) { newNote.description = Description; }
    if(Tag) { newNote.tag = Tag; }

    let note = await notes.findById(req.params.id)
    if(!note)
    {
        return res.status(401).send("Invalid Note")
    }
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Invalid Access")
    }
    note = await notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    return res.status(200).json({msg:"Note Updated !",note})
})

router.delete("/deleteNote/:id", fetchuser, async(req, res) =>{
    const note = await notes.findById(req.params.id)
    if(!note){
        return res.status(400).send("Invalid Note")
    }
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Unauthorised Access")
    }
    let temp = await notes.findByIdAndDelete(req.params.id)
    if(!temp)
    {
        return res.status(400).send("Error in Removing Note")
    }
    return res.status(200).json({msg:"Note Removed Successfully !",note:temp})
})
module.exports = router;