import Walletrepository from "../repository/wallet-repository.js";
import mongoose from "mongoose";
import Transactionrepository from "../repository/transaction-repo.js";
class TransactionService{
  constructor(){
    this.walletrepo=new Walletrepository()
    this.transactionrepo=new Transactionrepository()
  }
  async transferFunds(referenceId,senderId,recieverId,amt){
    const session=await mongoose.startSession();
    session.startTransaction();
    try{
      const existingtx=await this.transactionrepo.findBy(referenceId,session);
      if(existingtx){
        throw new Error("Duplicate transaction spotted!");
      }
     const senderwallet=await this.walletrepo.findBy(senderId,session);
     const recieverwallet=await this.walletrepo.findBy(recieverId,session);
     if(!senderwallet || !recieverwallet){
      throw new Error("Wallet not found");
     }
     if(senderwallet.balance<amt){
      throw new Error("balance is less than the amount ");
     }
     senderwallet.balance-=amt;
     await senderwallet.save({session});
     recieverwallet.balance+=amt;
     await recieverwallet.save({session});
     const tx=await this.transactionrepo.create(
      {
        referenceId: data.referenceId,
        senderWalletId: senderWallet._id,
        receiverWalletId: receiverWallet._id,
        amount: data.amount,
        status: 'SUCCESS'
      }
     )
     await session.commitTransaction();
     session.endSession();
     return tx;
    }catch(e){
      await session.abortTransaction();
      console.log("Somehting went wrong at the service layer");
      throw e;
    }
  }
}