const mongoose = require('mongoose')

const userSchema = new mangoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required:true},
        role: {type: String, enum:['admin','rider'], default:'rider'},
        contactNymber: {type: String},
        weight: {type: Number},
        age: {type: Number},
        package: {type: mongoose.Schema.Types.ObjectId, ref: 'Package'},
        joinedDate: {type: Date, default: Date.now}
    },
    { timestamps: true }
)
module.exports = mongoose.model('User', userSchema)