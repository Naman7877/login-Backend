
// here import mongodb 
const mongoose=require('mongoose');

// this is mongodb local environment addresh 
const mongoosuri="mongodb://localhost:27017/inotebook";

const connecttomongodb=()=>{

   // this is connect function that is used to connect mongodb to local mongodb environment (mongodb compass)
     mongoose.connect(mongoosuri,()=>{
        console.log("conection set");
     })
}

// this is for export the connect mongodb function 
module.exports=connecttomongodb;
