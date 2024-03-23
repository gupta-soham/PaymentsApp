const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
   const account = await Account.findOne({
    userId: req.userId
   });

   res.json({
    balance: account.balance
   });
});

router.post("/transfer", authMiddleware, async (req, res) => {
   const session = await mongoose.startSession();

   session.startTransaction();
   const { amount, to } = req.body;

   if(amount <= 0) {
      await session.abortTransaction();
        return res.status(400).json({
            message: "Incorrect Amount Paramters!"
        });
   }
   
   // Fetch accounts within the transaction
   const account = await Account.findOne({
    userId: req.userId
   }).session(session);

   if(!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
         message: "Insufficient Balance!"
      });
   }
   
   const toAccount = await Account.findOne({
      userId: to
   }).session(session);

   if(!toAccount) {
      await session.abortTransaction();
        return res.status(400).json({
            message: "Reciever does not exist!"
        });
   }

   if(account.toString() === toAccount.toString()) {
      await session.abortTransaction();
        return res.status(400).json({
            message: "Cannot Transfer to same account!"
        });
   }

   // Perform the transaction
   await Account.updateOne({ userId: req.userId }, { $inc: {balance: -amount} }).session(session);

   await Account.updateOne({ userId: to }, { $inc: {balance: amount} }).session(session);

   // Commit the transaction
   await session.commitTransaction();
   res.status(200).json({
      message: "Transfer Successful!"
   })

})


module.exports = router;