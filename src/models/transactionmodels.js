import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true 
    },
    senderWalletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    receiverWalletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Transaction amount must be at least 1']
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING'
    }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);