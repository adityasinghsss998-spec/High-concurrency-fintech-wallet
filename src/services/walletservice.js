import mongoose from "mongoose";
import Walletrepository from "../repository/wallet-repository.js";
class Walletservice{
  constructor(){
    this.walletrepo=new Walletrepository();
  }
  async deposit(userId,amt){
    const session=await mongoose.startSession();
    session.startTransaction();
    try{
      const wallet=await this.walletrepo.findBy(userId,session);
      if(!wallet){
        throw new error("Wallet not found");
      }
      wallet.balance+=amt;
      await wallet.save({session});
      await session.commitTransaction();
      session.endSession();
      return wallet;

    }catch(e){
      await session.abortTransaction();
      session.endSession();
      console.log("Somehting went wrong at the service layer");
      throw e;
    }
  }
}
export default Walletservice