import Walletrepository from "../repository/wallet-repository.js";
import mongoose from "mongoose";
import Transactionrepository from "../repository/transaction-repo.js";
class TransactionService{
  constructor(){
    this.walletrepo=new Walletrepository()
    this.transactionrepo=new Transactionrepository()
  }
  async transferFunds(referenceId,senderId,recieverId,amt){
    console.log(senderId)
    const session=await mongoose.startSession();
    session.startTransaction();
    try{
      const amount=Number(amt);
      const existingtx=await this.transactionrepo.findBy({referenceId},session);
      if(existingtx){
        throw new Error("Duplicate transaction spotted!");
      }
     const senderwallet=await this.walletrepo.findBy({userId:senderId},session);
     const recieverwallet=await this.walletrepo.findBy({userId:recieverId},session);
     if(!senderwallet || !recieverwallet){
      throw new Error("Wallet not found");
     }
     if(senderwallet.balance<amount){
      throw new Error("balance is less than the amount ");
     }
     senderwallet.balance-=amount;
     await senderwallet.save({session});
     recieverwallet.balance+=amount;
     await recieverwallet.save({session});
     const tx=await this.transactionrepo.create(
      {
        referenceId: referenceId,
        senderWalletId: senderwallet._id,
        receiverWalletId: recieverwallet._id,
        amount: amount,
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

  async TransactionHistory(uid,p,l){
    try{
      const wallet=await this.walletrepo.findBy({userId:uid});
      if(!wallet){
        throw new Error("wallet not found!!")
      }
      const s=(p-1)*l;
     const response=await this.transactionrepo.findTransaction(wallet._id,s,l);
     const totalpages=Math.ceil(response.cnt/l);
     return {
       transaction:response.txs,
       pages:totalpages,
       currentpage:p,
       totalitems:response.cnt
     }
    }catch(e){
     
      console.log("Somehting went wrong at the service layer",e.message);
      console.log(e.stack)
      throw e;
    }
  }
}
export default TransactionService

