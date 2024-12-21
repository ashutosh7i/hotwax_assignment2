//standard express setup
const express = require("express");
const app = express();
const cors = require("cors");

// import database connection
const { testConnection} = require("./dbConnection");

// middleware to parse the incoming request body
app.use(express.json());
app.use(cors());

// import routes
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");

// auth routes (unprotected)
app.use("/auth", authRoute);

// protect order routes with auth middleware
const auth = require("./middleware/auth");
app.use("/", auth, orderRoute);

// test db connection
testConnection();

// starting the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});