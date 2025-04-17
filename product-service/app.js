const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Product MongoDB connected"))
.catch((err) => console.error(err));

app.use(express.json());
app.use("/api/products", productRoutes);
app.get("/", (req, res) => res.send("Product service is running"));

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});
