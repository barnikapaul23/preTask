const { application } = require('express');
const express=require('express');
const userRouter=express.Router();
const {getUser,updateUser,deleteUser,getAllUser}=require('../Controllers/userController');
const {signup,login,isAuthorized,protectRouter}=require('../Controllers/authController');
// userRouter
//   .route("/")
//   .get(protectRouter,getUser)
//   .post(postUser)
//   .patch(updateUser)
//   .delete(deleteUser);
// userRouter
//   .route("/getCookies")
//   .get(getCookies);
//   userRouter
//   .route("/setCookies")
//   .get(setCookies);
// userRouter
//   .route("/:id")
//   .get(getUserById);

//user options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)
userRouter
.route('/signup')
.post(signup)
userRouter
.route('/login')
.post(login)
//user profile
userRouter.use(protectRouter);
userRouter
.route('/userProfile')
.get(getUser)
//admin
userRouter.use(isAuthorized(['admin']));
userRouter
.route('/')
.get(getAllUser)
module.exports=userRouter;