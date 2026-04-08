import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {

    try{
        
 const {token} = req.headers;;
        if(!token)
        {
            return res.json({success: false, message: "Not have token Login Again"})
        } 
        

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)
        {
            return res.json({success: false, message: "Not Authorized, Login Again"})
        }
//if everything is fine then we will allow the user to access the route
        next();

    } catch(error)
    {
        
        res.json({success: false, message:error.message})
    }

}

export default adminAuth;