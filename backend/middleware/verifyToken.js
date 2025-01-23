import jwt from "jsonwebtoken"


export const verifytoken = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];  
    if(!token) return res.status(401).json({success:false, message:"Unauthorized - no token provided"})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({success:false, message:"Unauthorized - invalid provided"})

        }
        req.userId = decoded.userId
        next()
        
    } catch (error) {
        console.log("Error in verifying Token ", error);
        return res.status(500).json({success:false, message:"server error"})

        
    }
}


export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided. Unauthorized access."
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token."
            });
        }
        req.user = decoded;  
        console.log(req.user);
        
        next();  
    });
};

