const { User } = require('../models');
const config = require('../config/status');

const createUser = async(body) => {
    if (await User.isEmailTaken(body.email)) {
        return {
            success:false,
            message:'Email Already Exist..',
            statusCode:config.STATUS_CODE.BAD_REQUEST,
            result:{}
        }
    } else {
        let result = await User.create(body);
        return {
            success:true,
            statusCode:config.STATUS_CODE.CREATED,
            message:'SIGN UP SUCCESFULLY....',
        }
    }
}

const login = async(body) => {
    const user = await getUserByEmail(body.email);
    if (!user || !(await user.isPasswordMatch(body.password))) {
        return {
            success:false,
            message:'Incorrect Email Or Password',
            result:{},
            statusCode:config.STATUS_CODE.NOT_FOUND
        }
    } else {
        return {
            success:true,
            message:'Login Succesfully..',
            statusCode:config.STATUS_CODE.OK,
            userDetails:user
        }
    }
}

const getUserByEmail = async (email) => {
    const result = await User.findOne({email});
    return result;
}

module.exports = {
    createUser,
    login
}