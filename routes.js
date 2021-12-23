import express from "express"
import { CustomerController, LocationController, TransactionController } from "./controller.js"

const routes = express.Router()

routes.get('/customers/', CustomerController.readAll)
routes.get('/customers/:id', CustomerController.readById)
routes.post('/customers/', CustomerController.save)
routes.delete('/customers/:id', CustomerController.delete)
routes.patch('/customers/:id', CustomerController.Update)

routes.get('/locations/', LocationController.readAll)
routes.get('/locations/:id', LocationController.readById)
routes.post('/locations/', LocationController.save)
routes.delete('/locations/:id', LocationController.delete)
routes.patch('/locations/:id', LocationController.Update)

routes.get('/transactions/', TransactionController.readAll)
routes.get('/transactions/:id', TransactionController.readById)
routes.post('/transactions/', TransactionController.save)
routes.delete('/transactions/:id', TransactionController.delete)
routes.patch('/transactions/:id', TransactionController.Update)

export default routes