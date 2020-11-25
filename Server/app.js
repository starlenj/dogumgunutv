const express = require("express"),
  bodyParse = require("body-parser"),
  mongoose = require("mongoose"),
  app = express(),
  node_media_server = require("./media_server"),
  thumbnail_generator = require("./cron/thumbnails");
const cors = require("cors");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/thumbnails", express.static("Server/thumbnails"));

app.use(bodyParse.json());
app.use(cors());

//ROUTER API

app.use("/", require("./routes/api/Register"));
app.use("/", require("./routes/api/Login"));
app.use("/", require("./routes/api/Auth"));

const server = app.listen(process.env.SERVER_PORT, () =>
  console.log(`App listening on ${process.env.SERVER_PORT}!`)
);
node_media_server.run();
thumbnail_generator.start();

const io = require("socket.io")(server);

const Message = require("./database/Message");
const User = require("./database/User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, config.server.secret);
    socket.userId = payload.id;

    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });

      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.username,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});
