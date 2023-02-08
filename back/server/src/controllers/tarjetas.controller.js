const asyncHandler = require('express-async-handler')
const tarjetas = require('../services/tarjetas.service');

//@desc Obtener informacion de todos los tarjetas
//@route GET /tarjetas/all
//@access Private
const getAll = asyncHandler(async (req,res)=>{
    res.json({data: await tarjetas.getAllCards()})
})

//@desc Insertar un nuevo tarjeta
//@route POST /tarjetas
//@access Public
const insertCard = asyncHandler(async (req,res)=>{
    const {id_grupo,id_maestro,codigo} = req.body

    if(!id_grupo || !id_maestro || !codigo){
        res.status(400)
        throw new Error('Por favor introduzca todos los campos')
    }

    //check if group exist
    var cardExist = false
    var results = await tarjetas.getCardByCode(codigo); 

    if(results.length>0){
        cardExist=true
    }

    if(cardExist){
        res.status(400)
        throw new Error('Teacher already exists')
    }

    //create tarjeta
    const tarjeta = {id_grupo, id_maestro, codigo}
    const insert = await tarjetas.create(tarjeta)

    if(insert.error){
        res.status(400)
        throw new Error('Invalid Teacher Data')
    }
    
    res.status(201).json(await tarjetas.getCardByCode(insert.code))
    
})

//@desc Obtener datos de tarjeta
//@route GET /tarjetas/tarjeta/:codigo
//@access Public
const getCard = asyncHandler(async (req,res)=>{
    const {code} = req.params.code 

    //check if card exist
    var result = await tarjetas.getCardByCode(code)

    if(result.length==0){
        res.status(400)
        throw new Error('No Card')
    }


    //find card
    const card = result[0]

    if(card){
        res.json({card}
        )
    }else{
        res.status(400)
        throw new Error('Invalid Data')
    }
})

// @desc    Eliminar tarjeta
// @route   DELETE /tarjetas/:code
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
    const result = await tarjetas.getCardByCode(req.params.code)
  
    if (result.length==0) {
      res.status(400)
      throw new Error('Card not found')
    }
  
    const tarjeta=result
  
    const response = await tarjetas.remove(tarjeta.codigo)
  
    res.status(200).json({ id:response })
  })


module.exports = {  
    getAll,
    insertCard,
    getCard,
    deleteCard
}