import mongoose, {Schema, model} from "mongoose";

const employeesSchema = new Schema({
    name:{
        type: String,
    },
    lastName:{
        type: String,
    },
    salary:{
        type: Number,
    },
    DUI:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    password:{
        type: String,
    },
    idBranches:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches",
    },
    isVerified:{
        type: Boolean,
    }
},{
    timestamps: true,
    strict: false,
})

export default model ("Employees", employeesSchema)