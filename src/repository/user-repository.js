import User from '../models/usermodel.js'
class Userrepository{
   async create(data, session = null) {
    try {
      const user = new User(data);
      await user.save({ session });
      return user;
    } catch(e) {
      console.log("Something went wrong at the repository layer",e.message)
      throw e;
    }
  }
   async findByEmail(email,session=null){
    try{
     const user=await User.findOne({email}).session(session);
     return user;
    }catch(e){
      console.log("Something went wrong at the repository layer",e.message)
    }
   }
   
}
export default Userrepository