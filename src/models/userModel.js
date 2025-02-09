const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone_no:{type:String,required:true},
    role:{type:mongoose.Schema.Types.ObjectId,ref:'Role',required:true},
    team:{type:String,required:true},
    team_lead:{type:String,required:true},
    new_password:{type:String,required:true}
});

const User = mongoose.model('User',userSchema);
module.exports=User;