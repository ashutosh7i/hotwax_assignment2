//standard express setup
const express = require("express");
const app = express();

// import database connection
const { testConnection} = require("./dbConnection");

// middleware to parse the incoming request body
app.use(express.json());

// import order routes
const orderRoute = require("./routes/order");
app.use("/", orderRoute);

// test db connection
testConnection();

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});