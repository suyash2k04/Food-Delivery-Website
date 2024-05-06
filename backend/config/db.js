import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://prajaktahikare:8329558868@cluster0.wgx1qfa.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}

