const express = require("express");
require("dotenv").config();
const app = express();
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");
const managerRouter = require("./routes/managerRoute")
const dbConfig = require("./dbConfig");
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/manager", managerRouter);


const port = process.env.port || 5000;
app.listen(port, () => console.log(`server is running on the port ${port}`));
