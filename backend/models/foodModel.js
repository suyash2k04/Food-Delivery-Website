import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

// Check if the model already exists in the cache before defining it
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;