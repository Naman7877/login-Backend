const express = require('express');
const router = express.Router();
const featchuser = require('../middware/fetchuser');
const Notes = require('../modules/Notes');
// this is for validate inputs 
const { body, validationResult } = require('express-validator');
const User = require('../modules/User');


// this is the first route for fetch all the notes of user
router.get('/featchallnotes', featchuser, async (req, res) => {

     try {
          const no = await Notes.find({ user: req.user.id });
          res.json(no);
     } catch (error) {
          res.status(500).send("some error occured");
     }
})

// routes for add a notes 
router.post('/addnotes', [

     body('title', 'enter valid Title ').isLength({ min: 3 }),
     body('description', 'Not null field ').isLength({ min: 3 }),

],async (req, res) => {

     try {
          const { title, description, tag } = req.body;
          const errors = validationResult(req);
          
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }
          const notes = new Notes(
               {
                    title, description, tag, user: req.user.id
               }
          )
          const savenode = await notes.save();

          res.json(savenode);
     } catch (error) {
          console.log(error.message);
          res.status(500).send("some error occured...");
     }

})

module.exports = router;