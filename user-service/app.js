const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("User MongoDB connected"))
.catch((err) => console.error(err));

app.use(express.json());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => res.send("User service is running"));

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
