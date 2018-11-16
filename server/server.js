const port = process.env.PORT || 5000;
const mongoose= require('mongoose');
var Schema=mongoose.Schema;
const express = require('express');
var bodyParser = require('body-parser');
const app=express();
app.use(express.static('public'));
var con;
mongoose.connect("mongodb://localhost/practicedatabase",function(err){
	if(err) throw err;
	console.log('connected to db');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
con=mongoose.connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
	next(); }
);

var InfoSchema= new Schema({
    name : {type:String},
    idno: {type:String},
    amount: {type:String},
    avatar : {type:String}
})

var InfoModel = mongoose.model('info',InfoSchema);
app.get('/getInfo',(req,res)=>{
    InfoModel.find({})
    .exec((err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
            res.end();
        }
    })
})
app.post('/addInfo',(req,res)=>{
    console.log("in post");
    var item= new InfoModel({
        name : req.body.name,
        idno : req.body.idno,
        amount : req.body.amount,
        avatar : req.body.avatar
    })
    item.save((err,result)=>{
      if(err){
          console.log(err);
          res.status(500).send(err);
      }
      else{
          console.log("save success");
          res.status(200).send(result);
          res.end();
      }
    })
})

app.post('/deleteInfo',(req,res)=>{
    InfoModel.deleteOne({ '_id' :req.body._id},(err,result)=>{
        if(err)
        res.send(err);
        else
        res.send(result);
        console.log('deleted');
    })
})

app.put('/update',(req,res) => {
    InfoModel.findOne({ 'name' : req.body.name})
    .exec((err,result)=>{
        if(err)
         res.send(err);
        else{
            Object.assign(result,req.body);
            result.save( (err,ans) =>{
                if(err){
                console.log(err);
                res.send(err);
                }
                else{
                console.log(ans);
                res.send(ans);
                }
            })
        }
    })
})

app.post('/sendData',(req,res)=>{
    console.log("in post");
    var item= new InfoModel({
        name : req.body.name,
        idno : req.body.idno
    })
    item.save((err,result)=>{
      if(err){
          console.log(err);
          res.status(500).send(err);
      }
      else{
          console.log("save success");
          res.status(200).send(result);
          res.end();
      }
    })
})