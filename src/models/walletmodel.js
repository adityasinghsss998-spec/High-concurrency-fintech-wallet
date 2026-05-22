import mongoose from "mongoose";
const walletSchema=new mongoose.Schema({
  userId:{
    type:String,
    ref:'User',
    requied:true
  },
  balance: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Balance cannot drop below zero'] 
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['INR', 'USD']
    }
},{timestamps:true});
export default mongoose.model('Wallet',walletSchema)