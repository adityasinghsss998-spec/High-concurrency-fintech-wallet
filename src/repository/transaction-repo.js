import Transaction from "../models/transactionmodels.js"
import mongoose from "mongoose";
class Transactionrepository {
  async create(data, session = null) {
    try {
      const response = await Transaction.create([data], { session });
      return response[0];
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }

  async findBy(data, session = null) {
    try {
      const response = await Transaction.findOne(data).session(session);
      return response;
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }
  async findTransaction(wId,s,l){
    try {
      const objectId = new mongoose.Types.ObjectId(wId);
      const b={
          $or: [
          { senderWalletId: objectId }, 
          { receiverWalletId: objectId }
        ]
      }
      const txs=await Transaction.find(b).sort({createdAt:-1}).skip(s).limit(l);
      const cnt=await Transaction.countDocuments(b);
      return {txs,cnt};
      return response;
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }
}

export default Transactionrepository;