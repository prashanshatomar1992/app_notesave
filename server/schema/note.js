const mongoose = require('mongoose');


var noteSchema = mongoose.Schema({
    createdby: { type: String },
    createdon: {type: Date},
    note: { type: String },
    favourite: { type: Boolean }
},{timestamp:true});


module.exports = mongoose.model('notesaver', noteSchema);