import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/PriceSmart2AIvanBarrera")

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database is connected")
})

connection.on("disconnected", () => {
    console.log("Database is disconnected")
}) 

connection.on("error", (error) => {
    console.error("error found"+ error)
})
