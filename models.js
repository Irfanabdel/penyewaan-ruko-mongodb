import mongoose from 'mongoose'

const Customer = mongoose.model(
    'Customer',
    mongoose.Schema({
        name : String,
        phone_number : String,
        address : String,
        created_at : Date,
    })
)

const Location = mongoose.model(
    'Location',
    mongoose.Schema({
        name : String,
        address : String,
        size : String,
        price : Number,
        created_at : Date,
    })
)

const Transaction = mongoose.model(
    'Transaction',
    mongoose.Schema({
        transaction_date : Date,
        total : Number,
        payment_price : Number,
        change : Number,
        customer : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
        },
        transaction_details: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'TransactionDetail',
            }
        ],
        created_at : Date,
    })
)

const TransactionDetail = mongoose.model(
    'TransactionDetail',
    mongoose.Schema({
        transaction_id : String,
        location : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
        },
        start : Date,
        end : Date,
        subtotal : Number,
        created_at : Date,
    })
)

export {Customer, Location, Transaction, TransactionDetail}