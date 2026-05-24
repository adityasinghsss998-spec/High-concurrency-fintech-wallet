
import TransactionService from "../services/transactionservice.js";
import Walletrepository from '../repository/wallet-repository.js'
const walletrepo=new Walletrepository();
const transactionservice=new TransactionService();
export const transfer=async (req,res)=>{
      try {
        console.log(req.user.id);
        console.log(req.user._id);
        console.log(req.body.senderId)
        if(String(req.user._id)!=String(req.body.senderId)){
          return res.status(403).json({
             success: false,
             message: "Forbidden: You cannot transfer funds from a wallet you do not own.",
             err: { message: "Authenticated user ID does not match the wallet owner ID." },
             data: {}
           });
        }
        const response=await transactionservice.transferFunds(req.body.referenceId,req.body.senderId,req.body.receiverId,req.body.amount);
        return res.status(201).json({
            success: true,
            message: "Funds transfered successfully",
            data: response,
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            err:error,
            data:{}
        });
    }

}

export const history = async (req, res) => {
  try {
    const uId = req.user._id || req.user.id;
    const transaction = await transactionservice.TransactionHistory(uId);
    return res.status(200).json({
      success: true,
      message: "History fetched",
      data: transaction,
      err: {}
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
      err: e,
      data: {}
    });
  }
};