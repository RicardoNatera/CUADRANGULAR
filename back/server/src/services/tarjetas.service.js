const db = require('./db.service');
const helper = require('../utils/helper.util');
// anadir error handling

async function getAllCards(){
    const rows = await db.query(
        'SELECT * FROM tarjetas'
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}


async function getCardByCode(CI){
    const rows = await db.query(
      'SELECT * FROM tarjetas WHERE codigo = ?', 
      [CI]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}


//Hay que arreglarla
async function getCardByID(id){
    const rows = await db.query(
      'SELECT * FROM tarjetas WHERE id_maestro = ? LIMIT 1', 
      [id]
    );
    
    const data = helper.emptyOrRows(rows);
    if(data.length>0){
        return data[0]
    }

    return data;
}
  
async function create(tarjeta){
const result = await db.query(
    `INSERT INTO tarjetas 
    (id_grupo, id_maestro, codigo)
    VALUES 
    (?, ?, ?)`, 
    [
    tarjeta.id_grupo,tarjeta.id_maestro,tarjeta.codigo
    ]
);

let message = {error: true};

if (result.affectedRows) {
    message = {
        error: false,
        id:result.insertId
    };
}

return message;
}

async function update(codigo, tarjeta){
const result = await db.query(
    `UPDATE update 
    SET id_grupo=?, id_maestro=?, 
    WHERE codigo=?`, 
    [
    tarjeta.id_grupo,tarjeta.id_maestro, codigo
    ]
);

let message = 'Error in updating Card';

if (result.affectedRows) {
    message = 'Card updated successfully';
}

return message;
}
async function existsCards(code){
    const rows = await db.query(
    `SELECT * FROM tarjetas WHERE codigo = ?`, 
    [code]
    );
    const data = helper.emptyOrRows(rows);

    return data;

}

async function remove(code){

    const check = existsCards(code)

    if(check.length>0){
        return -1;
    }
    
    const result = await db.query(
    `DELETE FROM tarjetas WHERE codigo=?`, 
    [code]
    );

let message = 'Error in deleting Card';

if (result.affectedRows) {
    
    message = 'Card deleted successfully';
}

return code;
}

module.exports = {
    getAllCards,
    getCardByCode,
    getCardByID,
    create,
    remove,
    update
}