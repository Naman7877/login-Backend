const mongoose=require('mongoose');
const {Schema}=mongoose;

const Noteschema=mongoose.Schema({

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        reuired:true
    },
    tag:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }

})



module.exports=mongoose.model('notes',Noteschema);