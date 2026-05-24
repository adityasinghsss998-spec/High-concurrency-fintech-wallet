import mongoose from 'mongoose';
import Userrepository from '../repository/user-repository.js'
import Walletrepository from '../repository/wallet-repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class Userservice{
  constructor(){
    this.userrepo=new Userrepository();
    this.walletrepo=new Walletrepository();
  }
  async registerUserusingWallet(email,password,name,initialbalance){
    const session=await mongoose.startSession();
     session.startTransaction();
     try{
        const exisiting_user=await this.userrepo.findByEmail(email,session);
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
  }
  async login(email,password){
    try{
      const user = await this.userrepo.findByEmail(email);
      if (!user){
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Incorrect password");
      }
      const token = jwt.sign(
        { id: user._id, email: user.email }, 
        process.env.JWT_SECRET || 'fallback_secret', 
        { expiresIn: '1d' }
      );
      return { user, token };
    }catch(e){
      console.log("Somehting went wrong the service layer")
      throw e;
     }
  }
}
export default Userservice