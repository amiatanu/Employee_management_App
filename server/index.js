const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/middleware.js");
const authRoutes = require("./routes/authRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const departmentRoutes = require("./routes/departmentRoutes.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const corsOptions = {
  origin: `http://localhost:${process.env.REACT_APP_PORT}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const port = 5000 || process.env.PORT;

const dbURI = process.env.MONGODB_URI_LOCAL;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome To Ipangram");
});

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
