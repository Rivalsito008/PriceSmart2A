import mongoose, {Schema, model} from "mongoose";
const reviewsSchema = new Schema({
    idEmployee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
    },
    idProduct:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    },
    rating:{
        type: Number,
    },
    comment:{
        type: String,
    }
},{
    timestamps: true,
    strict: false,
})

export default model ("Reviews", reviewsSchema)
