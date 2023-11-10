import mongoose from "mongoose";

const URI =
 "mongodb+srv://francodeanquin:Franco3598@cluster0.bmzg5oe.mongodb.net/Ecommerce?retryWrites=true&w=majority"

mongoose
    .connect(URI)
    .then(() => console.log("conectado a la base de datos"))
    .catch((error) => console.log(error));
