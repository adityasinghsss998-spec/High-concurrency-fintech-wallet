import Transaction from "../models/transaction.model.js";

class Transactionrepository {
  async create(data, session = null) {
    try {
      const response = await Transaction.create([data], { session });
      return response[0];
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }

  async findBy(data, session = null) {
    try {
      const response = await Transaction.findOne(data).session(session);
      return response;
    } catch(e) {
      console.log("something went wrong at the repository layer");
      throw e;
    }
  }
}

export default Transactionrepository;