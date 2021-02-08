const bodyParser = require("body-parser");
const Express = require("express");
const app = Express();
const Mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Models/User");

require("dotenv").config();
app.use("/ProductImages", Express.static("Upload/Product"));
Mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("MONGODB CONNECTION")
);
app.use(bodyParser.urlencoded({ extended: true, limit: "900mb" }));
app.use(bodyParser.json({ limit: "900mb" }));

app.use(cors());
//Routers
app.use("/Api/V1", require("./Route/Api/User"));
app.use("/Api/V1", require("./Route/Api/Address"));
app.use("/Api/V1", require("./Route/Api/Category"));
app.use("/Api/V1", require("./Route/Api/Images"));
app.use("/Api/V1", require("./Route/Api/Options"));
app.use("/Api/V1", require("./Route/Api/Pages"));
app.use("/Api/V1", require("./Route/Api/Product"));
app.use("/Api/V1", require("./Route/Api/Reserve"));
app.use("/Api/V1", require("./Route/Api/UserHareket"));
app.use("/Api/V1", require("./Route/Api/UserInvite"));
app.use("/Api/V1", require("./Route/Api/Auth"));
app.use("/Api/V1", require("./Route/Api/OrderHeader"));
app.use("/Api/V1", require("./Route/Api/OrderBody"));
app.use("/Api/V1", require("./Route/Api/TicketHeader"));
app.use("/Api/V1", require("./Route/Api/TicketBody"));
app.use("/Api/V1", require("./Route/Api/Upload"));
app.use("/Api/V1", require("./Route/Api/SonFiyatList"));
app.use("/Api/V1", require("./Route/Api/Mail"));
///SOCKET
var OnlineUser = [];
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
io.on("connection", async (socket) => {
  console.log("User Connected", socket.id);
  socket.emit("your id", socket.id);
  socket.broadcast.emit("toplam_kullanici", OnlineUser.length);
  //Total User
  require("./socket_route/ProductRoute")(socket);
  require("./socket_route/SonFiyatRoute")(socket);
  socket.on("disconnect", () => {

  });
});

io.use(async (socket, next) => {
  let socketId = socket.id;
  OnlineUser.push({ socketId });
  socket.broadcast.emit("toplam_kullanici", OnlineUser.length);
  next();
})
server.listen(process.env.PORT, () => {
  console.log(`APP STARTED ${process.env.PORT}`);
});
