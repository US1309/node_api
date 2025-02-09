const {ObjectId} = require('mongodb');
const express = require('express');
const User = require('../models/userModel');
const Role = require('../models/roleModel');


const postUserManagement = async(req,res)=>{
    const {name,email,phone_no,team,role,team_lead,new_password}=req.body;
    try{
        
        if(!name || !email || !phone_no || !team || !role || !team_lead || !new_password){
            return res.status(204).json({message:"some input field is missing"});
        }
        let existingRole = await Role.findOne({ name: role.trim().toLowerCase() });
        if(!existingRole){
            role =await  Role.create({
                role_id:Date.now(),
                name:role
            });
        }
        const user = await User.create({name,email,phone_no,team,role:existingRole._id,team_lead,new_password});
        
        return res.status(201).json({message:'User created successfully',user});

    }
    catch(err){
        res.status(500).json({message:'Error saving user data',error:err});
    }
};


const getUserManagement = async(req,res)=>{
   try{
    const users = await User.aggregate([
      {
        $lookup:{
            from:"roles",
            localField:"role",
            foreignField:"_id",
            as:"role_details"
        }
      },
      {$unwind:"$role_details"},
      {
        $project:{
            name:1,
            email:1,
            phone_no:1,
            team:1,
            role_name:"$role_details.name",
            team_lead:1,
            new_password:1
        }
      }
    ]);
    return res.status(200).json({message:"user management data fetched successfully",users});
   }catch(err){
    return res.status(500).json({error:"server unable to fetch data",err});
   }
};

const putUserManagement = async(req,res)=>{
    const {userId}=req.params;
    const {name,email,phone_no,team,role,team_lead,new_password}=req.body;
    try{
        if (!name || !email || !phone_no || !team || !role || !team_lead || !new_password) {
            return res.status(400).json({ error: "Some input fields are missing" });
          }
        let existingRole = await Role.findOne({name:role});
        if(!existingRole){
            role = await Role.create({
                role_id:Date.now(),
                name:role
            });
        }
        const updatedData = {name,email,phone_no,team,role:existingRole._id,team_lead,new_password};
        const result = await User.updateOne(
           {_id:new ObjectId(userId)},
           {$set:updatedData}
        );
        if(result.matchedCount==0){
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({message:'data updated successfully'});
    }catch(err){
        res.status(500).json({error:"server not able to update data"});
    }
};

const deleteUserManagement = async(req,res)=>{
    const {userId} = req.params;
    try{
        const result =await User.deleteOne({_id:userId});
        if(result.deletedCount==0){
           return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json({message:"data deleted successfully"});
    }catch(err){
        return res.status(500).json({message:"server unable to delete  data",err});
    }
};

module.exports={postUserManagement,getUserManagement,putUserManagement,deleteUserManagement};
