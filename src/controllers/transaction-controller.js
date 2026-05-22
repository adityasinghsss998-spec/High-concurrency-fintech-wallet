import TransactionService from "../services/transactionservice.js";
const transactionservice=new TransactionService();
export const transfer=async (req,res)=>{
      try {
        const response=await transactionservice.transferFunds(req.body.referenceId,req.body.senderId,req.body.receiverId,req.body.amount);
        console.log(response)
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