require("dotenv").config();
const express = require("express");
const app = express();
const { connectingToDb } = require("./database");
const Routes = require("./routes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsonDoc = require("./swagger.json");
const PORT = 1500;

app.use(cors());
app.use(express.json());
app.use("/", Routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsonDoc));
// const spacs= swaggerJsdoc(options)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));
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