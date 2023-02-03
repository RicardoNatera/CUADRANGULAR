const asyncHandler = require('express-async-handler')
const maestros = require('../services/maestros.service');

//@desc Obtener informacion de todos los maestros
//@route GET /maestros/all
//@access Private
const getAll = asyncHandler(async (req,res)=>{
    res.json({data: await maestros.getAllTeachers()})
})

//@desc Insertar un nuevo maestro
//@route POST /maestros
//@access Public
const insertTeacher = asyncHandler(async (req,res)=>{
    const {nombre,apellido,telefono,cedula} = req.body

    if(!nombre || !apellido || !telefono || !cedula){
        res.status(400)
        throw new Error('Por favor introduzca todos los campos')
    }

    //check if group exist
    var teacherExist = false
    var results = await maestros.getTeacherByCI(cedula); 

    if(results.length>0){
        teacherExist=true
    }

    if(teacherExist){
        res.status(400)
        throw new Error('Teacher already exists')
    }

    //create maestro
    const maestro = {nombre, apellido, telefono, cedula}
    const insert = await maestros.create(maestro)

    if(insert.error){
        res.status(400)
        throw new Error('Invalid Teacher Data')
    }
    
    res.status(201).json(await maestros.getTeacherById(insert.id))
    
})

//@desc Obtener datos de maestro
//@route GET /maestros/maestro/:cedula
//@access Public
const getTeacher = asyncHandler(async (req,res)=>{
    const {cedula} = req.params.cedula 

    //check if teacher exist
    var result = await maestros.getTeacherByCI(cedula)

    if(result.length==0){
        res.status(400)
        throw new Error('No Teacher')
    }


    //find teacher
    const teacher = result[0]

    if(teacher){
        res.json({teacher}
        )
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

// @desc    Eliminar maestro
// @route   DELETE /maestros/:id
// @access  Private
const deleteTeacher = asyncHandler(async (req, res) => {
    const result = await maestros.getTeacherById(req.params.id)
  
    if (result.length==0) {
      res.status(400)
      throw new Error('Teacher not found')
    }
  
    const maestro=result
  
    const response = await maestros.remove(maestro.id_maestro)
  
    res.status(200).json({ id:response })
  })


module.exports = {  
    getAll,
    insertTeacher,
    getTeacher,
    deleteTeacher
}