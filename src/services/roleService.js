const pool = require("../../Utils/db");

const roleService = {
    
  //Helper Services

  check_role_service: (req, role, callback) => {
    const checkIfRoleExists = "SELECT role FROM roles WHERE role = $1";
    pool.query(checkIfRoleExists, [role], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result.rows.length > 0);
      }
    });
  },

  //Main Services

  add_role_service: (req, role, description, callback) => {
    const addRole = "INSERT INTO roles (role, description) VALUES ($1, $2)";
    pool.query(addRole, [role, description], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        const roleData = {
          role: role,
          description: description,
        };
        callback(null, roleData);
      }
    });
  },

  get_role_service : (req,callback)=>{
    const getRole = `SELECT * FROM roles `;
    pool.query(getRole,[],(error,result)=>{
        if(error){
            callback(error,null);
        }else{
            callback(null,result.rows);
        }
    })
  }
};

module.exports = roleService;
