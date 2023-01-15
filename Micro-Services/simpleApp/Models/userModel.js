const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const db_link='mongodb+srv://admin:vhnaW93GCPpGRJPk@cluster0.lrntr3q.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
  .then(function(db){
    //console.log(db);
    console.log('db connected');
  })
  .catch(function(err){
    console.log(err);
  });

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/users/default.jpeg'
    }
});

userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});
// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// });
// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc);
// });
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;
//(async function createUser(){
    //let user={
        //name:'EF',
        //email:'ef@gmail.com',
        //password:'fjkhu786',
        //confirmPassword:'fjkhu786'
    //};
    //let data=await userModel.create(user);
    //console.log(data);
  //})();