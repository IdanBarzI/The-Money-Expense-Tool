require("dotenv").config();
require("./DataBase/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const expenseRouter = require("./routers/expense");
const cors = require("cors");
const corsOptions = require("./options/corsOptions");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(userRouter);
app.use(expenseRouter);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
