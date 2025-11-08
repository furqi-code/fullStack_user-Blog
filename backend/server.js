require('dotenv/config'); 
const express = require("express");
const app = express();
const PORT = parseInt(process.env.PORT) || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// const register = require("./router/register");
// const login = require("./router/login");
// const forgot = require("./router/forgotPassword");
const blogs = require("./router/blogs");

// app.use('/register', register);
// app.use('/login', login);
// app.use("/forgotPassword", forgot);
app.use('/blogs', blogs);

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
