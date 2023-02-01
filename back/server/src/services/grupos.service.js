const db = require('./db.service');
const helper = require('../utils/helper.util');
// anadir error handling

async function getGroupByName(name){
    const rows = await db.query(
      'SELECT * FROM grupos WHERE nombre = ?', 
      [name]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

async function getAllGroups(){
    const rows = await db.query(
        'SELECT * FROM grupos'
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}

async function getGroupById(id){
    const rows = await db.query(
      'SELECT * FROM grupos WHERE id_grupo = ? LIMIT 1', 
      [id]
    );
    const data = helper.emptyOrRows(rows);
    if(data.length>0)
        return data[0]
    return data;
}
  
async function create(grupo){
const result = await db.query(
    `INSERT INTO grupos 
    (edadInicio, edadFinal, nombre, color)
    VALUES 
    (?, ?, ?, ?)`, 
    [
    grupo.edadInicial,grupo.edadFinal,grupo.nombre, grupo.color
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

async function update(id, grupo){
const result = await db.query(
    `UPDATE update 
    SET edadInicio=?, edadFinal=?, nombre=?, color=?
    WHERE id_grupo=?`, 
    [
    grupo.edadInicio,grupo.edadFinal,grupo.nombre, grupo.color, id
    ]
);

let message = 'Error in updating Group';

if (result.affectedRows) {
    message = 'Group updated successfully';
}

return message;
}

async function remove(id){
const result = await db.query(
    `DELETE FROM grupos WHERE id_grupo=?`, 
    [id]
);

let message = 'Error in deleting Group';

if (result.affectedRows) {
    
    message = 'Group deleted successfully';
}

return id;
}

module.exports = {
    getAllGroups,
    getGroupById,
    getGroupByName,
    create,
    update,
    remove
}