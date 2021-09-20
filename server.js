const express=require('express');
const campaign=require('./campaigns/router')
const port =process.env.PORT || 5000;

const app=express();

app.use('/campaign',campaign)

app.listen(port,function(){
    console.log("server running on port:" + port)

});
