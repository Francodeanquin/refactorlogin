import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import "./db/config.js";
import MongoStore from "connect-mongo";
import usersRouter from "./routes/users.router.js"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import { Server } from "socket.io";
import { messageManager } from "./managers/messagesManager.js";
import session from "express-session"
import passport from "passport";
import "./middlewares/passport.middleware.js"

//express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars"); 

//session
const URI =
 "mongodb+srv://francodeanquin:Franco3598@cluster0.bmzg5oe.mongodb.net/Ecommerce?retryWrites=true&w=majority";
app.use(session({
    secret: "SECRETSESSIONKEY",
    cookie: {
        maxAge: 600000,
        signed: true,
    },
    store: new MongoStore({
        mongoUrl: URI,
    })
}));


//passport
app.use(passport.initialize());
app.use(passport.session());

//views
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/api/messages", chatRouter);


const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log("server is running on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log(`Cliente Conectado ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Cliente desconectado ${socket.id}`);
    });

    socket.on("bodyMessage", async (message) => {
        const newMessage = await messageManager.createOne(message);
        socketServer.emit("messageCreated", newMessage);
    });


});
