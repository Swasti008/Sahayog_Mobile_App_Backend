import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./src/connection/db.js";
import userRoute from "./src/routes/userRoutes.js";


const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173',
}));


const PORT = process.env.PORT || 5050;

await connectDB();

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use("/user",userRoute);
