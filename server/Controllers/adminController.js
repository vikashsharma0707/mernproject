
const adminModel = require("../Models/adminModel");
const userModel = require("../Models/userModel")


const adminDataCheck = async(req,res)=>{
    const {user,password} = req.body;
    // console.log(user,password)

    const admin = await adminModel.find({user:user});

    if(admin.length<1){
        res.status(404).send({msg:"invalid password"})
    }

    else{
        if(admin[0].password !=password){
            res.status(404).send({msg:"invalid password"})
        }

        else{
            res.status(200).send(admin)
        }
    }
}


const userDisplay=async(req,res)=>{
    try{
        const Data = await userModel.find()
        res.status(200).json(Data)
    }
    catch(err){
        res.status(404).json("Data not display")
    }
}


const userDisplaytask=async(req,res)=>{
    try{
        const Data = await userModel.find()
        res.status(200).json(Data)
    }
    catch(err){
        res.status(404).json("Data not display")
    }
}






module.exports={
adminDataCheck,
userDisplay,
userDisplaytask,
}

