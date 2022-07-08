const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
var featchuser=require('../middware/fetchuser');


const JWT_SECRET = "hiithisisnamanfromjaipur";

// her req men request and res mean response
// route number 1
router.post('/cre', [

    body('email', 'email is not valid').isEmail(),
    // password must be at least 5 chars long
    body('passward').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),

],
    async (req, res) => {
        // res.setHeader('Content-Type', 'application/json');


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "sorry this email is already exixt" });
            }

            // bcrypt gensalt/ hash function return a promise so use await
            // hash function is used to decrypt passward plain text to cipher text
            const salt = await bcrypt.genSalt(10);
            let secpass = await bcrypt.hash(req.body.passward, salt);


            user = await User.create({
                name: req.body.name,
                passward: secpass,
                email: req.body.email,
            })



            //   .then(user => res.json(user))
            //   .catch(err =>{console.log(err)
            //   res.json({Error: "please enter a unique user detail "})
            // });

            const data = {
                user: {
                    id: user.id
                }
            }
            // json web token require two input first is input data like id and second is secret data 

            const authtoken = jwt.sign(data, JWT_SECRET)

            // and after generating toke send response to user
            res.json({ authtoken });

        } catch (error) {
            console.log(error);
            res.status(500).send("some error occured");

        }

        // res.send(req.body);
        // const user = User(req.body);
        // user.save();
        // res.send("hii this is block ");
    })



// now request for login page 
// route number 2 
router.post('/login',

    [
        body('email', 'email is not valid').isEmail(),
        // exists function check that passward is not null 
        body('passward', 'enter a valid passward').exists(),
    ],
    async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // destructuring use 
        const { email, passward } = req.body;

        try {

            // if user id passward find than user variable contain all the info like passward, email
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "use right credential for login." });
            }

            const comparepassward = await bcrypt.compare(passward, user.passward);
            if (!comparepassward) {
                return res.status(400).json({ error: "use right credential for login..." });

            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET)

            // and after generating toke send response to user
            res.json({ authtoken });

        } catch (error) {
            console.log(error);
            res.status(500).send("some error occured");

        }
    })


// here exports work as a middle ware 


// route num 3 for get all the details of user 
router.post('/getuser',featchuser,async (req, res) => {
    try {
        const userid=req.user.id;
        const data=await User.findById(userid).select("-passward");
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("some error occured");
    }
})

module.exports = router 