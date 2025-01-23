import express from "express"
import { 
    login, 
    logout, 
    signup, 
    verifyEmail, 
    // checkAuth,
    viewUser, 
    updatePromise,  
    deletePromise, 
    getPromiseDetails,
    findPromiseWithId,
    addRequestToPromise,
    getRequestsOfPromise,
    sharePromise,
    getPromiseDetailsById,
    deleteRequest,
    getNotifications,
    getUsername,
    paymentGateway,
    paymentVerification,
    getEmail,
    getWalletDetails,
    ValidateACctDetails,
    trackShareAnalytics,
    getShareAnalyticsById,
    requestPasswordReset,
    resetPassword,
    getUserData,
    getAllPromises,
    createPaymentPin,
    checkPaymentPin,
    changePaymentPin,
    withdrawal,
    paystackWebHook,
   
   

} from "../controller/authcontroller.js"
import { authenticateToken, verifytoken } from "../middleware/verifyToken.js"

 const router = express.Router()
//  router.get("/check-auth", verifytoken, checkAuth)

 router.post("/login",login)
 router.post("/signup",signup)
 router.post("/logout",logout)
 router.post("/verify-email",verifyEmail)
 router.post("/reset-password",requestPasswordReset)
 router.post("/password-update/:token", resetPassword)
 router.get("/veiw-user",viewUser)
 router.get("/getUserData", authenticateToken, verifytoken, getUserData)
 router.put("/update-promise",authenticateToken,verifytoken, updatePromise);
 router.delete('/deletePromise', deletePromise);
 router.get('/user/promises',authenticateToken , verifytoken , getPromiseDetails);
 router.put("/addRequest", addRequestToPromise);
 router.get('/submit-request', findPromiseWithId);
 router.post ('/get-promise-requests', authenticateToken,verifytoken, getRequestsOfPromise);
 router.post('/sharePromise/:promiseTitleId', sharePromise);
 router.get('/get-promise-details/:promiseTitleId', getPromiseDetailsById);
 router.delete('/delete-request', authenticateToken, verifytoken, deleteRequest);  
 router.get('/notifications',authenticateToken, verifytoken,getNotifications);
 router.get("/getUsername", verifytoken, getUsername)
 router.post ("/paystack/payment", paymentGateway)
 router.post('/payment/verify',paystackWebHook, paymentVerification)
 router.get('/get-user-email', getEmail)
 router.get ('/getWalletDetails', getWalletDetails)
 router.post('/validate', ValidateACctDetails)
 router.post('/track/:promiseTitleId/:shareToken', trackShareAnalytics);
 router.get('/analytics/:promiseTitleId', getShareAnalyticsById);
 router.get("/promises/:username", getAllPromises)
 router.post('/create-payment-pin', verifytoken, createPaymentPin); 
 router.post('/check-payment-pin', verifytoken, checkPaymentPin);   
 router.post('/change-payment-pin', verifytoken, changePaymentPin);  
 router.post('/withdraw', withdrawal); 







 

// more controllers below

export default router