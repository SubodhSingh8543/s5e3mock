const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { connect } = require("./db");
const { userRoute } = require("./routes/authRoute");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api",userRoute);

app.listen(process.env.port, async () => {
    try {
        await connect;
        console.log("Connected to db");
    } catch (error) {
        console.log(error);
        console.log("Disconnected from db");
    }
})