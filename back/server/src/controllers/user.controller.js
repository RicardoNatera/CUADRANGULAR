const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const usuarios = require('../services/usuarios.service');

//@desc Registro de nuevo usuario
//@route POST /users
//@access Public
const registerUser = asyncHandler(async (req,res)=>{
    const {usuario,email,password} = req.body
    var {isAdmin} = req.body

    if(!isAdmin){
        isAdmin = false
    }
    if(!usuario || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exist
    var userExist = false
    var results = await usuarios.getUserByEmailOrUser(email,usuario); 

    if(results.length>0){
        userExist=true
    }

    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create User
    const user = {usuario, hash:hashedPassword, isAdmin, email}
    const insert = await usuarios.create(user)

    if(insert.error){
        res.status(400)
        throw new Error('Invalid User Data')
    }
    
    //id es el id en la bd
    res.status(201).json({
        id:insert.id,
        token: generateToken(insert.id)
    })
    
})

//@desc Autenticacion de  usuario
//@route POST /users/login
//@access Public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body 

    //check if user exist
    var result = await usuarios.getUserByEmail(email)

    if(result.length==0){
        res.status(400)
        throw new Error('No User')
    }


    //find user
    const user = result[0]

    if(user && (await bcrypt.compare(password,user.hash))){
        res.json({id:user.id,
            token: generateToken(user.id)}
        )
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

})

//@desc Obtener informacion de  usuario
//@route GET /users/me
//@access Private
const getMe = asyncHandler(async (req,res)=>{
    res.json({message:req.user.id})
})

//@desc Obtener todos los usuarios
//@route GET /users/all
//@access Private
const getAll = asyncHandler(async (req,res)=>{
    res.json({data: await usuarios.getAllUsers()})
})

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}
module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAll
}