import validator from 'validator'
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) =>
{
 try{
    const {email, password } = req.body;
    const user = await userModel.findOne({email});

    if(!user)
    {
        return res.json({success: false, message: "User not Found"})
    }
     const isMatch = await bcrypt.compare(password, user.password);
     if(isMatch)
     {
        const token = createToken(user._id); 
        res.json({success:true, token});
     }
     else
     {
        res.json({success: false, message: "Wrong Password"})
     }

 } catch(error)
 {
   
    return res.json({success: false, message: "Invalid credentials"})
 }
}

const registerUser = async (req, res) =>
{
 try{
    const {name, email, password} = req.body;

    const exists = await userModel.findOne({email});

    if(exists)
    {
        return res.json({success:false, message: "User Already Exists"});

    }
    if(!validator.isEmail(email))
    {
        return res.json({success:false, message:"Please Enter valid email"})
    }
    if(password.length<8)
    {
        return res.json({success:false, message:"Password must be atleast 8 characters"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({name, email, password:hashedPassword});
    const user=await newUser.save();
 
    //we provide one token using that token user can log in
    const token = createToken(user._id);


    return res.json({success:true, token});


 } catch(error)
 {
    
     return res.json({success:false, message:"An error occurred while registering the user"});
 }
 
}

const adminLogin = async (req, res) =>
{
 try{
    const {email, password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
    {
        const token = jwt.sign(email+password, process.env.JWT_SECRET);

        res.json({success: true, token})

    }
 } catch(error)
 {
   
    res.json({success: false, message: "Invalid Credentials"})
 }

}

export { loginUser, registerUser, adminLogin }