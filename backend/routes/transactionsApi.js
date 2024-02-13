const express = require("express")
const router = express.Router()
const Database = require('../utilities/DatabaseManager.js')


router.get('/categories',async function (req, res) {
    await Database.breakdownSumByCategory().then((data) => {res.send(data)})
})
router.delete('/:id', function(req, res){
    const transactionId = req.params.id 
    Database.deleteTransactionById(transactionId).then((data) => {res.send({data})})
        .catch(() => res.status(400).end())
})
router.get('/',async function (req, res) {
    await Database.findAllTransactions().then((data) => {res.send(data)})
})
router.post('/',async function(req,res){
    const newTransactionData = req.body
    await Database.addNewTransaction(newTransactionData).then((data) => {
        console.log(`The amount of the expense: ${data.amount} and what you spent your money on ${data.category}`)
        res.end()})
        .catch((error) => res.status(400).end())
})



module.exports = router