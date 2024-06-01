const express = require("express");
const app = express();
const { connectingToDb } = require("./database");
const Routes = require("./routes/routes");
const PORT = 1500;

app.use(express.json());
app.use("/", Routes);
const startServer = async () => {
  try {
    await connectingToDb();

    app.listen(PORT, () => {
      console.log("Listening on port: " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
