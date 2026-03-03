import { Account } from "../models/account.js";
import { Transaction } from "../models/transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    // valid user account

    const fromUserAccount = await Account.findOne({
      _id: fromAccount,
    });

    const toUserAccount = await Account.findOne({
      _id: toAccount,
    });

    if (!fromUserAccount || !toUserAccount) {
      return res.status(400).json({
        msg: "No user account",
      });
    }

    //valid idempotencyKey

    const isTransactionAlreadyExists = await Transaction.findOne({
      idempotencyKey: idempotencyKey,
    });

    if (isTransactionAlreadyExists) {
      if (isTransactionAlreadyExists.status === "COMPLETED") {
        return res.status(200).json({
          msg: "transaction completed",
          transaction: isTransactionAlreadyExists,
        });
      }

      if (isTransactionAlreadyExists.status === "PENDING") {
        return res.status(200).json({
          msg: "transaction is pending",
        });
      }

      if (isTransactionAlreadyExists.status === "FAILED") {
        return res.status(500).json({
          msg: "transaction has failed",
        });
      }

      if (isTransactionAlreadyExists.status === "REVERSED") {
        return res.status(500).json({
          msg: "transaction has reversed , please try again",
        });
      }
    }

    //check account status
    if (
      fromUserAccount.status !== "ACTIVE" ||
      toUserAccount.status !== "ACTIVE"
    ) {
      return res.status(500).json({
        msg: "Both the accounts must be active",
      });
    }



    
  } catch (error) {
    console.log("createTransaction error:-", error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};
