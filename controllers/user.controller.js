const { userService } = require('../services');
const { validate } = require('../utils');
const config = require('../config/status');
const {logger} = require('../utils');

const signUp =async (req,res) => {
    try {
        const validateFields = {
            name:'required|string',
            email:'required|string|email',
            password:'required|string|minLength:6|maxLength:12',
            age:'required|integer',
            address:'required|object',
            'address.city':'required|string',
            'address.zipcode':'required|integer',
            'address.area':'required|string',
            'address.state':'required|string',
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const result = await userService.createUser(req.body);
            res.status(result.statusCode).json(result); 
        } else {
            res.status(config.STATUS_CODE.BAD_REQUEST).json({success:false,result:checkFields})
        }
    } catch(err) {
        logger.error('Err::',err);
        res.status(config.STATUS_CODE.SERVER_ERROR).json({err:err,success:false})
    }
}

const login = async(req,res) => {
    try {
        const validateFields = {
            email:'required|string|email',
            password:'required|string',
        }
        const checkFields = await validate.validateData(req.body,validateFields);
        if(checkFields.success) {
            const result = await userService.login(req.body);
            res.status(result.statusCode).json(result);
        } else {
            res.status(config.STATUS_CODE.BAD_REQUEST).json({success:false,result:checkFields})
        }
    } catch(err) {
        logger.error('Err::',err);
        res.status(config.STATUS_CODE.SERVER_ERROR).json({err:err,success:false})
    }
}
module.exports = {
    signUp,
    login
}