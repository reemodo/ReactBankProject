const mongoose = require('mongoose')
const Transaction = require('../model/Transaction.js')
class Database {
    static connectDB (){
        //TODO: move the URL To const in config or fo with env
        mongoose.connect("mongodb://127.0.0.1:27017/bankDB", {}).catch((err)=> console.log(err))
    }
    static async findAllTransactions(){
        return await Transaction.find({})
    }
    static async addNewTransaction(newTransactionData){
        const newTransaction = new Transaction(newTransactionData)
        return await newTransaction.save()
    }
    static async deleteTransactionById(transactionId){
        return await Transaction.findOneAndDelete( {_id: transactionId } )
    }
    static async breakdownSumByCategory (){
        return await Transaction.aggregate([{$group: {
            _id: "$category",
            totalAmount: {
              $sum: {
                $cond: {
                  if: { $eq: ["$type", "deposit"] }, // Check if type is "deposit"
                  then: "$amount", // Add amount if deposit
                  else: { $subtract: [0, "$amount"] } // Subtract amount if withdraw
                }
              }
            }
          }}])
    }
    
}
module.exports = Database