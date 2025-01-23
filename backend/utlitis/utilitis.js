import jwt from "jsonwebtoken"
export const generateverificationcode = ()=>{
    return Math.floor(100000 + Math.random()*900000).toString()

}

export const generateTokenSetCookies =(res, userId)=>{
    const token = jwt.sign(
        {userId : userId}, process.env.JWT_SECRET,{
            expiresIn:"7d",        }

        
        
    )
    res.cookie(
        "token",token,{
            httponly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge: 7*24*60*60*1000,
        }

        
    )
    console.log(token);
    
    return token;
}
