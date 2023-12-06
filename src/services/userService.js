const pool = require("../../Utils/db");
const constants = require("../../Utils/constants");

const userService = {
  check_mail_service: (req, email, callback) => {
    const checkIfMailExists = "SELECT email FROM userdetails WHERE email = $1";
    pool.query(checkIfMailExists, [email], (error, result) => {
      if (error) {
        callback(error, null);
      }
      callback(null, result.rows.length > 0);
    });
  },

  get_user_service: (req, callback) => {
    const getUser = `SELECT * FROM userdetails`;
    pool.query(getUser, [], (error, result) => {
      if (error) {
        callback(error, null);
      }
      callback(null, result.rows);
    });
  },

  get_user_by_id: (req, id, callback) => {
    const getUserById = `SELECT * FROM userdetails WHERE id =$1::uuid`;
    pool.query(getUserById, [id], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        const user =
          result.rows && result.rows.length > 0 ? result.rows[0] : null;
        if (!user) {
          const notFoundError = new Error(constants.userNotFound(id));
          callback(notFoundError, null);
        } else {
          callback(null, user);
        }
      }
    });
  },

  get_user_and_roles:(req,id,callback)=>{
    const getUserWithRoles = `SELECT * FROM userdetails u JOIN roles r ON u.role_id = r.id WHERE u.id=$1::uuid`;
    pool.query(getUserWithRoles,[id],(error,result)=>{
        if(error){
            callback(error,null);
        }else{
            const user = result.rows && result.rows.length > 0 ? result.rows[0] : null;
            if(!user){
                const notFoundError = new Error(constants.userNotFound(id));
                callback(notFoundError,null);
            }else{
                callback(null,user);
            }
        }
    })
  },

  add_user_service: (req, userData, callback) => {
    const { name, age, address, role_id, email } = userData;
    const addUser =
      "INSERT INTO userdetails (name,age,address,role_id,email) VALUES ($1,$2,$3,$4,$5)";
    pool.query(addUser, [name, age, address, role_id, email], (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, userData);
    });
  },

  update_user: (req, id, userData, callback) => {
    const { name, age, address, role_id, email } = userData;
    const updateUser = `UPDATE userdetails SET name =$1,age=$2,address=$3,role_id=$4 WHERE id =$5::uuid`;
    pool.query(
      updateUser,
      [name, age, address, role_id, id],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, userData);
      }
    );
  },

  delete_user: (req, id, callback) => {
    const deleteUser = `Delete from userdetails WHERE id=$1::uuid`;
    pool.query(deleteUser, [id], (error) => {
      if (error) {
        return callback(error, null);
      }
      callback(null);
    });
  },
};

module.exports = userService;
