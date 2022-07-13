const mongoose = require("mongoose");
const http = require("http");

const express = require("express");
const app = express();

const user = require("./routes/register");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;
mongoose
//   .connect(`mongodb+srv://moni:moni@cluster0.fmvc4.mongodb.net/task`, {
    .connect(`mongodb://localhost:27017/task`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

const server = http.createServer(app);

app.use("/api", user);


server.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});

