const express=require('express');
const app=express();
app.listen(3000);
//index page
app.get('/', (req, res)=>{
    res.sendFile('./files/index.html',{root:__dirname});
});
//404 page
app.use((req,res)=>{
    res.status(404).sendFile('./files/404.html',{root:__dirname});
});

module.exports=app;