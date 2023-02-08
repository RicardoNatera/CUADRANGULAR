const db = require('./db.service');
const helper = require('../utils/helper.util');
// anadir error handling

async function getAllCards(){
    const rows = await db.query(
        'SELECT * FROM maestros'
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}


async function getCardByCode(CI){
    const rows = await db.query(
      'SELECT * FROM maestros WHERE cedula = ?', 
      [CI]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

async function getCardByID(id){
    const rows = await db.query(
      'SELECT * FROM maestros WHERE id_maestro = ? LIMIT 1', 
      [id]
    );
    
    const data = helper.emptyOrRows(rows);
    if(data.length>0){
        return data[0]
    }

    return data;
}
  
async function create(maestro){
const result = await db.query(
    `INSERT INTO maestros 
    (nombre, apellido, telefono, cedula)
    VALUES 
    (?, ?, ?, ?)`, 
    [
    maestro.nombre,maestro.apellido,maestro.telefono, maestro.cedula
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

async function update(id, maestro){
const result = await db.query(
    `UPDATE update 
    SET nombre=?, apellido=?, telefono=?, cedula=?
    WHERE id_maestro=?`, 
    [
    maestro.nombre,maestro.apellido,maestro.telefono,maestro.cedula, id
    ]
);

let message = 'Error in updating Teacher';

if (result.affectedRows) {
    message = 'Teacher updated successfully';
}

return message;
}
async function existsCards(id){
    const rows = await db.query(
    `SELECT * FROM tarjetas WHERE id_maestro=?`, 
    [id]
    );
    const data = helper.emptyOrRows(rows);

    return data;

}

async function remove(id){

    const check = existsCards(id)

    if(check.length>0){
        return -1;
    }
    
    const result = await db.query(
    `DELETE FROM maestros WHERE id_maestro=?`, 
    [id]
    );

let message = 'Error in deleting Group';

if (result.affectedRows) {
    
    message = 'Teacher deleted successfully';
}

return id;
}

module.exports = {
    getAllCards,
    getCardByCode,
    getCardByID,
    create,
    remove,
    update
}