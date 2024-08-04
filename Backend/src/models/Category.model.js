import mongoose, { Schema } from "mongoose";
const CategorySchema=new Schema({
    name:{
        type:String
    },
    pic:{
        type:String
    }
},{timestamps:true})

export const Category=mongoose.model("Category",CategorySchema);