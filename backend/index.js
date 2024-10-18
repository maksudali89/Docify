import express, { urlencoded } from "express";
import cors from 'cors';
const app = express();
const PORT = 3000;
import { ConnectionOfMonoDb } from "./config/mongoDb.js";
import userRoute from './router/user.js';
import docsRouter from './router/doc.js';
app.use(cors());
app.use(express.json());

// MongoDb connect
ConnectionOfMonoDb("mongodb://localhost:27017/Docify")
  .then(() => console.log("mongodb connect successfully"))
  .catch((err) => console.log(err));


//   Routes
app.use('/',userRoute);
app.use('/docs',docsRouter);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
