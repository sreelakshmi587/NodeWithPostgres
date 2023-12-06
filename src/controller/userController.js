const userService = require("../services/userService");
const constants = require('../../Utils/constants');

const userController = {

    get_users : (req,res)=>{
        userService.get_user_service(req,(error,result)=>{
            if(error){
                return res.status(404).json({ message: constants.noUsers, error: error.message })
            }
            return res.status(200).json({ message: constants.usersRetreived, role: result});
        })

    },

    get_user_by_id :(req,res)=>{
        const id = req.params.id; 
        userService.get_user_by_id(req,id,(error,result)=>{
            if(error){
                return res.status(404).json({ message: constants.userByIdNotFound(id), error: error.message })
            }
            return res.status(200).json({ message: constants.userRetreived, role: result});
        })
    },

    get_user_and_roles : (req,res)=>{
        const id = req.params.id;
        userService.get_user_and_roles(req,id,(error,result)=>{
            if(error){
                return res.status(404).json({ message: constants.userByIdNotFound(id), error: error.message });
            }
            return res.status(200).json( {message: constants.userWithRolesRetreived(id), user: result});
        })
    },

    add_user:(req,res)=>{
        const {name,age,address,role_id,email} = req.body;
        const userData = { name, age, address, role_id, email };
        userService.check_mail_service(req,email,(error,exist)=>{
            if(error){
                return res.status(500).json({message:constants.mailError,error:error.message});
            }
            if(exist){
                return res.status(409).json({message:constants.emailAlreadyExists(email)});
            }
            userService.add_user_service(req,userData,(error,result)=>{
                if(error){
                    return res.status(500).json({ message: constants.errorAddingUser, error: error.message });
                }
                return res.status(200).json({ message: constants.userDetailsAdded, user: result });
            })
        })
    },

    update_user: (req, res) => {
        const { name, age, address, role_id, email } = req.body;
        const userData = { name, age, address, role_id, email };
        const id = req.params.id;
    
        userService.get_user_by_id(req, id, (error, result) => {
            if (error) {
                return res.status(404).json({ message: constants.userByIdNotFound(id), error: error.message });
            }
    
            userService.update_user(req, id, userData, (updateError, updatedUserData) => {
                if (updateError) {
                    return res.status(404).json({ message: updateError.message });
                }
    
                return res.status(200).json({ message: constants.userDetailsUpdated, user: updatedUserData });
            });
        });
    },

    delete_user : (req,res)=>{
        const id = req.params.id;
        userService.get_user_by_id(req, id, (error, result) => {
            if (error) {
                return res.status(404).json({ message: constants.userByIdNotFound(id), error: error.message });
            }
        userService.delete_user(req,id,(deleteError)=>{
            if(deleteError){
                return res.status(500).json({message:constants.errorDeletingUser,error:deleteError.message});
            }
            return res.status(200).json({ message: constants.userDeleted});
        });
    });
}, 
}

module.exports = userController;