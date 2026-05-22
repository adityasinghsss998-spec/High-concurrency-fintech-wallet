import mongoose from 'mongoose';
import Userrepository from '../repository/user-repository.js'
import Walletrepository from '../repository/wallet-repository.js';

class Userservice{
  constructor(){
    this.userrepo=new Userrepository();
    this.walletrepo=new Walletrepository();
  }
  async registerUserusingWallet(email,password,name,initialbalance){
    const session=await mongoose.startSession();
     session.startTransaction();
     try{
        const exisiting_user=await this.userrepo.findByEmail({email},session);
        if(exisiting_user){
          throw new Error("Email is already registered");
        }
        const user=await this.userrepo.create({
          email:email,
          password:password,
          name:name
        },session);
        const wallet=await this.walletrepo.create({
         userId:user._id,
         balance:initialbalance,
         currency:"INR"
        },session);
         await session.commitTransaction();
         session.endSession();
        return {user,wallet};
     } catch(e){
      console.log("Somehting went wrong the service layer")
      await session.abortTransaction();
      session.endSession();
      throw e;
     }
    const user=this.userrepo.create(data);
   
  }
}
export default Userservice