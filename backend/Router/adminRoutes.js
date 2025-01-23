import express from "express"
import { AdminLogin, createAdmin, getAllUSers, getUserTransactions } from "../controller/admincontroller.js"
import { adminOnly, authenticate } from "../middleware/authAdminMiddleware.js"
const router = express.Router()



router.post('/admin/createAdmin', createAdmin)
router.post ('/admin-login', AdminLogin)
router.get('/admin/users', authenticate, adminOnly , getAllUSers)
router.get('/admin/user/:id/transactions', authenticate, adminOnly, getUserTransactions)



export default router