const userModel=require('../Models/userModel');
module.exports.getUser=async function getUser(req,res){
    //let allUsers=await userModel.find();
    let id=req.params.id;
    let user=await userModel.findById(id);
    if(user){
        return res.json(user);
    }else{
        return res.json({
            message:'User not found'
        });
    }
}
// module.exports.postUser=function postUser(req,res){
//     console.log(req.body);
//     user=req.body;
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// }
module.exports.updateUser=async function updateUser(req,res){
    //console.log('req.body->',req.body);
    try {
        let id=req.params.id;
        let user=await userModel.findById(id);
        let dataToBeUpdated=req.body;
        if(user){
            const keys=[];
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=dataToBeUpdated[keys[i]];
            }
            const updatedData=await user.save();
            res.json({
                message:"data updated successfully",
                data:user
            });
        }
        else{
            res.json({
                message:'User not found'
            });
        }
    } catch (error) {
        res.json({
            message:error.message
        });
    }
}
module.exports.deleteUser=async function deleteUser(req,res){
    let id=req.params.id;
    try {
        let user=await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'User not found'
            })
        }
        res.json({
            message:"data has been deleted",
            data:user
        });
    } catch (error) {
        res.json({
            message:error.message
        });
    }
}
module.exports.getAllUser=async function getAllUser(req,res){
    let users=await userModel.find();
    if(users){
        res.json({
            message:'Users retrieved',
            data:users
        });
    }
    res.send('User id received');
}
