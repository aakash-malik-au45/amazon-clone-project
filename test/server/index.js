require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comments")
const app = express();

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"));
app.use("/user", userRoutes);
app.use("/api", authRoutes);
app.use("/", postRoutes);
app.use("/", commentsRoutes)

const port = process.env.PORT || 8003;
app.listen(port, () => console.log(`Listening on port ${port}...`));