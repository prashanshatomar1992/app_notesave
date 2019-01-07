"use strict"
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Note = require('../schema/note');

//create note
router.post('/addnote', (req, res, next) => {
    // console.log(req.body)
    var newNote = new Note({
        createdby: req.body.createdby,
        createdon: new Date(),
        note: req.body.note,
        favourite: 0
    });
    newNote.save((err, note) => {
        if (err) {
            res.json('Error occur while saving note, err ' + err);
        } else {
            res.json('Note saved successfully.');
        }
    });
});

//get all notes
router.get('/getallnotes', (req, res, next) => {
    console.log('Getting all notes');
    Note.find({},function (err, notes) {      

        if (err) {
            console.log(err)
            // res.json(err);
            res.send({status:0,payload:err,message:"failed"});
        } else {
            // console.log(notes)
            res.send({status:1,payload:notes,message:"success"});
        }
    });
    
});
//get only fav notes
router.get('/getfavnotes', (req, res, next) => {
    console.log('Getting all notes');
    Note.find({favourite:true},function (err, notes) {
        if (err) {
            // res.json(err);
            res.send({status:0,payload:err,message:"failed"});

        } else {
            // res.json(notes);
            res.send({status:1,payload:notes,message:"success"});

        }
    });
    
});
//update the note as favourite note
router.get('/addtofav/:id', (req, res, next) => {
    console.log(req.params.id)
    console.log('Set note as favourite.');
    Note.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id)}, { $set: { favourite: 1 } }, { upsert: true }, 
        function (err, notes) {
        if (err) {
            // res.json(err);
            res.send({status:0,payload:err,message:"failed"});

        } else {
            // res.json(notes);
            res.send({status:1,payload:notes,message:"success"});

        }
    });

});

//update the note from favourite
router.get('/removefav/:id', (req, res, next) => {
    console.log('Remove note from favourite.'); 
    Note.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { favourite: 0 } }, { upsert: true }, 
        function (err, notes) {
        if (err) {
            // res.json(err);
            res.send({status:0,payload:err,message:"failed"});

        } else {
            // res.json(notes);
            res.send({status:1,payload:notes,message:"success"});

        }
    });
    
});
module.exports = router;

module.exports = router;
