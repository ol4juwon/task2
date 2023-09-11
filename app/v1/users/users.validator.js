"use strict"

const Joi = require('@hapi/joi')
const debug = require("debug")("app:db")

exports.create = ( req,res,next) => {
console.log("Before Validating ===> ", req.body)
    const schema = Joi.object( {
        name: Joi.string().min(4).required(),
        username: Joi.string().required(),
        track : Joi.string().required(),
        email: Joi.string().min(6).required().email(),
        age: Joi.string().required(),
       
    })

    const {error,value} = schema.validate(req.body)
    console.log("After validating",value)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }
    return next();
    
}





exports.updateValidation = ( req,res, next ) => {
    console.log("Before validating update", req.body);
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })

    const { error, data} = schema.validate(req.body)
    if(error){
        return createErrorResponse(res, error.details[0].message.replace(/['"]/g,''), 422);
    }

    return next();

}