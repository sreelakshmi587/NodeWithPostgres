const roleService = require("../services/roleService");
const constants = require("../../Utils/constants");
const roleController = {
   
    add_role: (req, res) => {
        const { role, description } = req.body;
    
        roleService.check_role_service(req, role, (error, exists) => {
          if (error) {
            return res.status(500).json({ message: constants.errorCheckingRole, error: error.message });
          }
          
          if (exists) {
            return res.status(409).json({ message: constants.roleAlreadyExists });
          }
    
          roleService.add_role_service(req, role, description, (error, roleData) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: constants.errorCreatingRole, error: error.message });
            }
            return res.status(200).json({ message: constants.roleCreated, role: roleData });
          });
        });
      },

      get_role : (req,res)=>{
        roleService.get_role_service(req,(error,result)=>{
            if(error){
                return res.status(404).json({ message: constants.noRoles, error: error.message })
            }
            return res.status(200).json({ message: constants.rolesRetreived, role: result});
        })
      }

    
}

module.exports = roleController;