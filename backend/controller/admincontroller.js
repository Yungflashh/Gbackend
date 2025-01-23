import { User } from '../models/useModels.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const  createAdmin = async (req, res) => {

    const{email, password, firstName , lastName, username, phone} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
        isAdmin: true  
    });

    try {
        await admin.save();
        console.log('Admin user created successfully');
        res.status(201).json({
            success : true,
            message: "Admin created Successfully",
            admin:{
                ...admin._doc,
                password:undefined,
            }
        })
    } catch (error) {
        console.error('Error creating admin user:', error);

        res.status(400).json({sucess:false, message :error.message})
    }
};


export const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the user is an admin
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Validate password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid password' });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
};


export const getAllUSers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};


export const getSingleUser =  async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

export const updateUserInfo = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
};


export const getUserTransactions = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('wallet.transactions');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.wallet.transactions);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user transactions', error: err });
    }
};
