const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const usuarios = require('../services/usuarios.service');


const protect = asyncHandler(async (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token and db
            const results = await usuarios.getUserById(decoded.id)
            if(results.length>0){
                req.user = results[0]
            }else{
                res.status(401)
                throw new Error('Not Authorized')
            }

            next()

        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

const protectAdmin = asyncHandler(async (req,res,next) => {
    const {id} = req.user
    
    const results = await usuarios.getIsAdminById(id)
    

    /*if(err){
        res.status(500)
        throw new Error('DataBase Error')
    }*/

    if(results.length==0){
        res.status(401)
        throw new Error('No User')
    }else if(results.length>0 && (results[0].isAdmin)){
        next() 
    }else{
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect, protectAdmin }