const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./model/users");
const create_token = require("./utils/token");
const manageruser = require("./model/manageruser");

const app = express();
app.use(express.json());
app.use(cors());

const urldb="mongodb://127.0.0.1:27017/bancodados";
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology:true});

app.get("/",(req,res)=>{
    res.send({output:req.headers})
});
app.post("/api/user/add",(req,res)=>{
    const data = new users(req.body);
    data.save().then((result)=>{
        res.status(201).send({output:"New user inserted",payload:result})
    }).catch((error)=>console.error({output:`insertion Fail -> ${error}`}))
});

app.post("/api/user/login",(req,res)=>{
    const us = req.body.user;
    const ps = req.body.password;

    User.findOne({username:us},(error,result)=>{
        if(error)return res.status(500).send({output:`Error at find user -> ${error}`});
        if(!result) return res.status(404).send({output:`User not found`});
        
        bcrypt.compare(ps,result.password,(error,data)=>{
            if(!data) return res.status(400).send({output:`Password authentication Fail`});
            const token = create_token(result._id,result.username);
            const info = new manageruser({userid:result._id,username:result.username,information:req.headers});
            info.save();
            res.status(200).send({output:`Authenticated`,payload:result,token:token,url:"http://127.0.0.1:5533"})
        });
    });
});

app.listen(4000,()=>console.log(`Server at http://127.0.0.1:4000`));
