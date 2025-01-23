import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,
    verificationToken: String,
    verificationTokenExpiredAt: Date,

    promiseTitle: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: { type: String, required: false },
        requests: [{
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            requestType: { 
                type: String, 
                enum: ['money', 'gift-item'], 
                required: false 
            },
            requestValue: { 
                type: mongoose.Schema.Types.Mixed, 
                required: false 
            },
            paid: { type: Boolean, default: false },
        }],
        timestamp: { type: Date, default: Date.now },
        shareToken: { type: String, required: false },
        shareAnalytics: [{
            os: { type: String },  // Operating System (e.g., 'Windows', 'MacOS')
            deviceType: { type: String },  // Device type (e.g., 'phone', 'tablet', 'desktop')
            phoneBrand: { type: String },  // Phone brand (e.g., 'Apple', 'Samsung')
            ip: { type: String },  // IP address of the user accessing the link
            city: { type: String },  // City based on IP lookup
            country: { type: String },  // Country based on IP lookup
            isp: { type: String },  // ISP based on IP lookup
            deviceCategory: { type: String },  // 'phone', 'tablet', 'desktop', 'laptop'
            timestamp: { type: Date, default: Date.now }  // Timestamp of the access
        }]
    }],

    promiseDescription: [{
        description: { type: String, required: false },
        timestamp: { type: Date, default: Date.now }
    }],

    notifications: [{
        message: { type: String, required: false },
        timestamp: { type: Date, default: Date.now }
    }],

    wallet: {
        balance: {
          type: Number,
          default: 0
        },
        currency: {
          type: String,
          default: 'NGN'
        },
        transactions: [{
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the payer user
          amount: { type: Number, required: true },  // Payment amount
          description: { type: String, required: true }, 
          
          status: {
            type: String,
            enum: ['Failed', 'Approved', 'Pending'],
            required: false
        },
          transactionType: {
            type: String,
            enum: ['deposit', 'withdrawal', 'payment', 'refund'],
            required: false
        },
          timestamp: { type: Date, default: Date.now },  // Transaction timestamp
          Transaction_ID : { type: String, required: false },
        }]
      },

    paymentPin: {
        type: String, 
        required: false, 
        minlength: 4,
        select: false 
    },


    isAdmin: {
        type: Boolean,
        default: false  
    },
},



{ timestamps: true });

export const User = mongoose.model('User', userSchema);
