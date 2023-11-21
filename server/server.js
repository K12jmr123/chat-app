const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const mysql = require("mysql");
// server/server.js
const registerRouter = require('./register/register');
const loginRouter = require('./login/login');
const port = 4000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'chat-app'
});


const io = socketio(server);

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/index.html");
    connection.connect((err, connection)=>{
        if(err) {
            console.error('Not Connected'+ err.stack);
            return;
        }
    
        console.log('Connected'+connnection.threadId);
    
        connection.end((err)=>{
            if (err){
                console.error(''+err.stack);
                return;
            }
            console.log('Connection Closed');
        });
    });
})

io.on("connection", (socket) =>{

    console.log("connected");

    socket.on("chat message", (message) =>{

        io.emit("chat message", message);

    });

    socket.on("disconnect", ()=>{
        console.log("disconnected");


    });


});


server.listen(4000, () =>{
    console.log("Server listening on PORT 4000");
});


app.use('/register', registerRouter);
app.use('/login', loginRouter);