import User from '../models/usermodel.js'
class Userrepository{
   async create(data,session=null){
    try{
     const response = await User.create([data], { session });
      return response[0];
    }catch(e){
      console.log("Something went wrong at the repository layer")
    }
   }
   async findByEmail(email,session=null){
    try{
     const user=await User.findOne(email).session(session);
    }catch(e){
      console.log("Something went wrong at the repository layer")
    }
   }
}
export default Userrepository