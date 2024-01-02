const express = require("express");
const connectdb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieparser = require('cookie-parser')
const dotenv = require("dotenv").config();
const { rateLimiterUsingThirdParty } = require('./middlewares/rateLimit');





connectdb();

const app = express();

const port = process.env.PORT || 8080;


app.use(cookieparser())
app.use(express.json());
app.use(rateLimiterUsingThirdParty);

app.get("/", (req, res) => {
  res.send("from express server ")

})

app.use(express.static("public"));


app.use("/api/student", require("./routes/studentRoutes"));

app.use('/api/admin',require('./routes/adminRoutes'));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
