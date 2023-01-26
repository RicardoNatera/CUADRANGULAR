const asyncHandler = require('express-async-handler')
const grupos = require('../services/grupos.service');

//@desc Insertar un nuevo grupo
//@route POST /grupos
//@access Public
const insertGroup = asyncHandler(async (req,res)=>{
    const {edadInicial,edadFinal,nombre} = req.body
    
    if(!edadInicial || !edadFinal || !nombre){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if group exist
    var groupExist = false
    var results = await grupos.getGroupByName(nombre); 

    if(results.length>0){
        groupExist=true
    }

    if(groupExist){
        res.status(400)
        throw new Error('Group already exists')
    }

    //create grupo
    const grupo = {nombre, edadInicial, edadFinal}
    const insert = await grupos.create(grupo)

    if(insert.error){
        res.status(400)
        throw new Error('Invalid Group Data')
    }
    
    res.status(201).json(await grupos.getGroupById(insert.id))
    
})

//@desc Obtener datos de  grupo
//@route GET /groups/group/:nombre
//@access Public
const getGroup = asyncHandler(async (req,res)=>{
    const {nombre} = req.params.nombre 

    //check if group exist
    var result = await grupos.getGroupByName(nombre)

    if(result.length==0){
        res.status(400)
        throw new Error('No Group')
    }


    //find group
    const group = result[0]

    if(group){
        res.json({group}
        )
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

//@desc Obtener informacion de todos los grupos
//@route GET /groups/all
//@access Private
const getAll = asyncHandler(async (req,res)=>{
    res.json({data: await grupos.getAllGroups()})
})


// @desc    Eliminar grupo
// @route   DELETE /groups/:id
// @access  Private
const deleteGroup = asyncHandler(async (req, res) => {
    const result = await grupos.getGroupById(req.params,id)
  
    if (result.length==0) {
      res.status(400)
      throw new Error('Group not found')
    }
  
    const grupo=result[0]
  
    await grupos.remove(grupo.id_group)
  
    res.status(200).json({ id: req.params.id })
  })

module.exports = {
    deleteGroup,
    getAll,
    getGroup,
    insertGroup
}