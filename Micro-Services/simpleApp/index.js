const express=require('express');
const app=express();
const cors=require('cors');
const fs=require('fs');

app.use(cors());

app.use(express.json());
app.listen(3000);
//let users=[
    //{
        //'id':1,
        //'name':"ABC"
    //},
    //{
        //'id':2,
        //'name':"DEF"
    //},
    //{
        //'id':3,
        //'name':"GHI"
    //}
//];
const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');
app.use("/user",userRouter);
app.use("/auth",authRouter);

app.get('/api',function(req,res){
    if(req.url==='/favicon.ico'){
        res.end();
    }
    const json=fs.readFileSync('count.json','utf-8');
    const obj=JSON.parse(json);
    obj.pageviews=obj.pageviews+1;
    if(req.query.type==='visit-page'){
        obj.visits=obj.visits+1;
    }
    const newJSON=JSON.stringify(obj);
    fs.writeFileSync('count.json',newJSON);
    res.send(newJSON);
})

module.exports=app;