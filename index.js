const express = require('express')
const connecttomongodb=require('./db');

// here run the connect mongodb function
connecttomongodb();

const app = express()
const port = 3000

app.use(express.json());

// here use router 
app.use('/api/auth',require('./routes/auth.js'));
app.use('/api/notes',require('./routes/notes.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// here express is used to server 
// require module is used to adapt the module 