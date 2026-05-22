import Wallet from '../models/walletmodel.js'

class Walletrepository {
  async create(data, session = null) {
    try {
      const response = await Wallet.create([data], { session });
      return response[0];
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }

  async findBy(data, session = null) {
    try {
      const response = await Wallet.findOne(data).session(session);
      return response;
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }
  async update(data,id,session=null){
    try {
      const response = await Wallet.findByIdAndUpdate(id,data,{new:true}).session(session);
      return response;
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }
}

export default Walletrepository;