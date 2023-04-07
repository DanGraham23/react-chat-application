const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");
const cookieParse = require('cookie-parser');

const jwt = require('jsonwebtoken');

const app = express();

require("dotenv").config();

app.use(cors({ origin:'http://localhost:3000', credentials:true }));
app.use(express.json());
app.use(cookieParse());
app.use("/api/auth", userRoutes);
app.use("/api/messages",messageRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection successful");
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server connected on port:${process.env.PORT}`);
});

const io = socket (server, {
    cors: {
        origin:"http://localhost:3000",
        credentials:true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieved", data.message);
        }
    });
});