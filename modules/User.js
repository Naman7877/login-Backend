const mongoose=require('mongoose');

// create a schema for mongodb database 
// schema conatin  all information of user
const userschema=mongoose.Schema({

    name:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        reuired:true,
        unique: true
    },
    passward:{
        type:String,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now
    }

})


// for stop duplicates entries in data base use index system 
const User=mongoose.model('user',userschema);
// create indexes for remove duplicate 
User.createIndexes();

// here export this module and after this import this modeule form other function
module.exports=User;