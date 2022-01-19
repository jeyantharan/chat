const express = require('express');
const mongoose = require('mongoose');
const req = require('express/lib/request');
const user = require('./model/user');
const app = express()
const server =require('http').createServer(app)
const io = require('socket.io')(server)

const model = require('./model/user');

app.set('views', './view')
app.set("view engine","ejs")

app.get('/login',(req,res)=>{
    res.render("login")
})

const mongouri =
 "mongodb://localhost:27017/chat";

let connection = mongoose.connect(mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  connection
    .then(() => {
    
        console.log("Database connection established");
  
        
      });
    

server.listen(3000,()=>{
    console.log("server running");
})

io.on('connection',(socket)=>{
    socket.on('user',(name)=>{
        socket.join(name);
        app.get('/home',(req,res)=>{
            res.render("home")
        })
        // const newUser = new model({
        //     Username:name,
        //   });
        // newUser.save()

       // const users = model.find({Username:"pavi"});
        //console.log(users);
        const users = [];
        users.push(name)
        console.log(name);
       socket.auth ={"names": users}
//     console.log("id : "+ socket.id)
 console.log(socket.userID);
    socket.on('message',(data)=>{
        //console.log(data);
        const obj = {
            "name":"john",
            "message":"message recived"
        }
        
        socket.to("john").emit('message',data)
    })
    })
  
})