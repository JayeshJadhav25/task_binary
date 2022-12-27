const { Validator } = require('node-input-validator');
const { logger } = require('./logger');

const validateData = async (getData,checkData) => {
  try {
    const validateResult = new Validator(getData,checkData);
    const isMatch = await validateResult.check();
  
    if(isMatch) {
      return {
        result :validateResult,
        success: true
      };
    } else {
      return {
        error:"PARAMETER ISSUE",
        list:validateResult.errors,
        success: false
      }
    }
  } catch(err) {
    logger.error('Err::',err);
    return {
        success:false,
        err:err
    }
  }
}

module.exports = {
    validateData
}