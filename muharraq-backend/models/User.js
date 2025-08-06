const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required:true},
        role: {type: String, enum:['admin','rider'], default:'rider'},
        contactNumber: {type: String},
        weight: {type: Number},
        age: {type: Number},
        selectedPackage: {
            packageId: {type: mongoose.Schema.Types.ObjectId, ref: 'Package'},
            sessionLeft: {type: Number}, 
            daysLeft: {type: Number},
            bookedAt: {type: Date} 
        },
        profileImage: {type: String, default: 'defaultUser.jpg'}
    } , 
    { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)