import bcrypt from 'bcryptjs';
import { User } from './useModels.js';

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash('adminPassword123', 10);

    const admin = new User({
        email: 'admin@example.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        phone: '1234567890',
        isAdmin: true  // Set this user as an admin
    });

    try {
        await admin.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdmin();
