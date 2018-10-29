const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import db helpers
const notesDb = require('../data/noteHelpers.js');
const usersDb = require('../data/userHelpers.js');

// use the db schema defined in the config file
const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

/*** DB SEARCH FUNCTIONS REFERENCE: ***/
// .find()
// .find(id)
// .insert(note)
// .update(id, newNote)
// .remove(id)

// Get all notes
server.get('/api/notes', (req, res) => {
    notesDb.find().then(notes => {
        return res.status(200).json(notes);
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "An error occured retrieving the notes."});
    })
})

// Get note by ID
server.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notesDb.findById(id).then(note => {
        if(!note){
            return res.status(404).json({error: `Project with ID ${id} does not exist.`});
        } else {
            return res.status(200).json(note);
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `Error retrieving note ${id}`});
    })
})

// Add new note

server.post('/api/notes', (req, res) => {
    console.log(req.body);

    const newNote = {
        'title': req.body.title,
        'content': req.body.content,
        'tags': req.body.tags,
        'user_id': req.body.user_id
    }

    if(newNote.title.length < 1 || newNote.content.length < 1 || !newNote.user_id){
        return res.status(400).json({error: `New notes must have a title, content, and user ID.`})
    }

    notesDb.insert(newNote).then(reply => {
        return res.status(201).json({message: `New note successfully added with ID ${reply.id}.`})
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: `An error occured when adding the new note.`})
    })
})

server.get('/', (req, res) => {
    res.send('Server is running.');
});

module.exports = server;