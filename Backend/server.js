
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { notfound, errorhandler } from "./errormiddleware.js";
import colors from "colors";

import productRoutes from "./Router/productRoute.js";
import userRoutes from "./Router/userRoute.js";
import orderRoutes from "./Router/orderRoute.js"; // ✅ Correct plural name
import  UploadsRoutes from "./Router/UploadsRoute.js"
import path from "path"
dotenv.config({ path: "./Backend/.env" });
connectDb();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// ✅ Use correctly named imports
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes); // ✅ Ensure proper import
app.use("/api/uploads",UploadsRoutes)
app.use(notfound);
app.use(errorhandler);


// create static folder


const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold
      .cyan.underline
  );
});
