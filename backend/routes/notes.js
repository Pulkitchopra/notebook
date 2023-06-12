const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {

        console.log(error);
        res.status(500).send("Some error");
    }
})

router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 6 }),
    body('description', 'Enter valid description').isLength({ min: 6 }),
],
    async (req, res) => {
        try {

            const { title, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, user: req.user.id
            }
            )

            const savedNote = await note.save();
            res.json(savedNote)
        } catch (error) {
            console.log(error)
            res.status(500).send("Some error");
        }
    })

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {

        const { title, description } = req.body;
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        let note = await Notes.findById(req.params.id);
        if (!note) {
            res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error");
    }
}
)

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        // const { title, description } = req.body;
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Delete": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error)
        res.status(500).send("Some error");
    }

})

module.exports = router