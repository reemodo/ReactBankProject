const express = require("express")
const router = express.Router()
const Database = require('../utilities/DatabaseManager.js')


router.get('/categories', async function (req, res) {
    try{

        const data = await Database.breakdownSumByCategory()
        res.send(data)
    }
    catch{ res.status(400).end()}

})
router.delete('/:id',async function(req, res){
    try{
        const transactionId = req.params.id 
        const data = await Database.deleteTransactionById(transactionId)
        res.send(data)
    }
    catch{ res.status(400).end()}
})
router.get('/',async function (req, res) {
    try{
        const data = await Database.findAllTransactions()
        res.send(data)
    }
    catch{ res.status(400).end()}
 
})
router.post('/', async function(req,res){
    try{
        const newTransactionData = req.body
        const data = await Database.addNewTransaction(newTransactionData)
        res.send(data)
    }
    catch{ res.status(400).end()}
   
})



module.exports = router