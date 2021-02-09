const express = require("express"),
  bodyParse = require("body-parser"),
  mongoose = require("mongoose"),
  app = express(),
  node_media_server = require("./media_server"),
  thumbnail_generator = require("./cron/thumbnails");
const bcrypt = require("bcrypt");
const AdminModel = require("./model/Admin");
const cors = require("cors");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
app.use("/thumbnails", express.static("server/thumbnails"));

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5000",
  })
);

app.use("/Api", require("./routes/Api/Auth"));
app.use("/Api", require("./routes/Api/Admin"));
app.use("/Api", require("./routes/Api/Chatroom"));
app.use("/Api", require("./routes/Api/Message"));
app.use("/Api", require("./routes/Api/Package"));

app.listen(process.env.PORT, async () => {
  //Create Admin User

  let Model = await AdminModel.find({});
  if (Model.length == 0) {
    bcrypt.hash("emre0209", 10, async (error, hash) => {
      let CreateAdmin = await new AdminModel({
        name: "Nasuh Emre ATEŞSOY",
        email: "emreatessoy@gmail.com",
        password: hash,
      }).save();
    });
  }
  console.log(`App listening on ${process.env.PORT}!`);
});
node_media_server.run();
thumbnail_generator.start();
