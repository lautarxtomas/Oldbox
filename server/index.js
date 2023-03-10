import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import messageRoutes from "./routes/message.js";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

// socket io
import { Server as Socketserver } from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = new Socketserver(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
    console.log('Cliente conectado =>', socket.id)

    socket.on('message', (message, nickname) => {
        // send to all clients
        socket.broadcast.emit('message', {
            body: message,
            from: nickname,
        })
    })
})


// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected 💾"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors()); // for axios petitions
app.use(morgan("dev")); // requests logger
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

// routes
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 8080;


const srv = server.listen(PORT, () =>
  console.log(`Node server is running on port ${PORT} 🚀`)
);
srv.on("error", (error) => console.log(`Error on server ${error}`));
