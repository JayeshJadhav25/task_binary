const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        city:{
            type:String,
            required:true,
            trim: true,
        },
        state:{
            type:String,
            required:true,
            trim: true,
        },
        area:{
            type:String,
            required:true,
            trim: true,
        },
        zipcode:{
            type:Number,
            required:true,
        }
    },
    password:{
        type:String,
        required:true,
        private: true
    },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User',userSchema);

module.exports = User;