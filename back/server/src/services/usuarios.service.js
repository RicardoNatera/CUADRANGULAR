const db = require('./db.service');
const helper = require('../utils/helper.util');
// anadir error handling

async function getUserByEmail(email){
    const rows = await db.query(
      'SELECT id, hash FROM usuarios WHERE email = ? LIMIT 1', 
      [email]
    );
    const data = helper.emptyOrRows(rows);
    return data;
}

async function getUserByEmailOrUser(email,usuario){
    const rows = await db.query(
        'SELECT id, hash FROM usuarios WHERE usuario = ? OR email = ? LIMIT 1',
        [usuario,email]
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}

async function getUserById(id){
    const rows = await db.query(
      'SELECT id FROM usuarios WHERE id = ? LIMIT 1', 
      [id]
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}

async function getIsAdminById(id){
    const rows = await db.query(
      'SELECT isAdmin FROM usuarios WHERE id = ? LIMIT 1', 
      [id]
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}

async function getUserInfoById(id){
    const rows = await db.query(
      'SELECT id, usuario, email, isAdmin FROM usuarios WHERE id = ? LIMIT 1', 
      [id]
    );
    const data = helper.emptyOrRows(rows);
  
    return data;
}
  
  async function create(user){
    const result = await db.query(
      `INSERT INTO usuarios 
      (usuario, hash, isAdmin, email)
      VALUES 
      (?, ?, ?, ?)`, 
      [
        user.usuario, user.hash, user.isAdmin, user.email
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
  
  async function update(id, user){
    const result = await db.query(
      `UPDATE usuarios 
      SET usuario=?, hash=?, isAdmin=?, email=?
      WHERE id=?`, 
      [
        user.usuario, user.hash, user.isAdmin, user.email, id
      ]
    );
  
    let message = 'Error in updating user';
  
    if (result.affectedRows) {
      message = 'User updated successfully';
    }
  
    return message;
  }
  
  async function remove(id){
    const result = await db.query(
      `DELETE FROM usuarios WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting user';
  
    if (result.affectedRows) {
      message = 'User deleted successfully';
    }
  
    return message;
  }

  async function getAllUsers(){
    const rows = await db.query(
      'SELECT id, usuario, isAdmin, email FROM usuarios'
    );
    const data = helper.emptyOrRows(rows);

    return data;
  }
  
  module.exports = {
    getUserByEmail,
    getUserByEmailOrUser,
    getUserById,
    getIsAdminById,
    getUserInfoById,
    getAllUsers,
    create,
    update,
    remove
  }