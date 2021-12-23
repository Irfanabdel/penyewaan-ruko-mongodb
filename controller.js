import { Customer, Location, Transaction, TransactionDetail} from "./models.js"

export const CustomerController = {
    readAll : async (req, res) => {
        try {
            const customers = await Customer.find()
            res.status(200).json(customers)
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    readById : async (req, res) => {
        try {
            const id = req.params.id
            const customer = await Customer.findById(id)
            res.status(200).json(customer)
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    save : async (req, res) => {
        try {
            const customer = new Customer(req.body)
            await customer.save()
            res.status(201).json({message : "Berhasil Simpan Kustomer"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    Update : async (req, res) => {
        try {
            const id = req.params.id
            await Customer.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Update Kustomer Berhasil Bos"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    delete : async (req, res) => {
        try {
            const id = req.params.id
            const check = await Customer.findById(id)
            if (!check) return res.status(401).json({message: "Kustomer Tidak Ada"})
            await Customer.deleteOne({_id : id})
            res.status(200).json({message: "Sukses Hapus Kustomer"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
}

export const LocationController = {
    readAll : async (req, res) => {
        try {
            const locations = await Location.find()
            res.status(200).json(locations)
        }
        catch (error) {
            res.status(500).json({message: "Nih error gais"})
        }
    },
    readById : async (req, res) => {
        try {
            const id = req.params.id
            const location = await Location.findById(id)
            res.status(200).json(location)
        }
        catch (error) {
            res.status(500).json({message: "Nih error gais"})
        }
    },
    save : async (req, res) => {
        try {
            const location = new Location(req.body)
            await location.save()
            res.status(201).json({message : "Berhasil Simpan Lokasi"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    Update : async (req, res) => {
        try {
            const id = req.params.id
            await Location.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Update Lokasi Berhasil Bos"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    delete : async (req, res) => {
        try {
            const id = req.params.id
            const check = await Location.findById(id)
            if (!check) return res.status(401).json({message: "Lokasi Tidak Ada"})
            await Location.deleteOne({_id : id})
            res.status(200).json({message: "Sukses Hapus Lokasi"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    }
}

export const TransactionController = {
    readAll : async (req, res) => {
        try {
            const transactions = await Transaction.find().populate('customer').populate('transaction_details')
            res.status(200).json(transactions)
        }
        catch (error) {
            res.status(500).json({message: "Nih error gais"})
        }
    },
    readById : async (req, res) => {
        try {
            const id = req.params.id
            const transaction = await Transaction.findById(id).populate('customer').populate('transaction_details')
            res.status(200).json(transaction)
        }
        catch (error) {
            res.status(500).json({message: "Nih error gais"})
        }
    },
    save : async (req, res) => {
        try {
            await TransactionDetail.insertMany(req.body.transaction_detail).then( async (items) => {
                const transactionId = []

                items.map((item) => {
                    transactionId.push(item.id)
                })


                const transaction = new Transaction({
                    transaction_date : req.body.transaction_date,
                    total : req.body.total,
                    payment_price : req.body.payment_price,
                    change : req.body.change,
                    customer : req.body.customer,
                    transaction_details: transactionId,
                    created_at : req.body.created_at,
                })

                await transaction.save()

                res.status(201).json({message: "Save Transaksi Berhasil", data: transaction})
            })
        }
        catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    Update : async (req, res) => {
        try {
            const id = req.params.id
            await Transaction.updateOne({_id: id}, {$set: req.body})
            res.status(200).json({message: "Update Transaksi Berhasil Bos"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    },
    delete : async (req, res) => {
        try {
            const id = req.params.id
            const check = await Transaction.findById(id)
            if (!check) return res.status(401).json({message: "Transaksi Tidak Ada"})
            await Transaction.deleteOne({_id : id})
            res.status(200).json({message: "Sukses Hapus Transaksi"})
        } catch (error) {
           res.status(500).json({message: "Nih error gais"}) 
        }
    }
}
