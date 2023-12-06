module.exports={

    //user Constants

    noUsers:'There are no users',
    usersRetreived : 'Users retreived',
    userByIdNotFound :(id)=> `There is no user with the id ${id}`,
    userNotFound :(id)=>`User with id ${id} not found`,
    userRetreived:'User retreived',
    userWithRolesRetreived:(id)=> `User details with roles for id ${id} is retreived.`,
    mailError:`Error checking email`,
    emailAlreadyExists:(email)=>`User with ${email} as email already exists.`,
    errorAddingUser:'Error in adding user',
    userDetailsAdded:'User details are successfully added',
    userDetailsUpdated:'Userdetails updated successfully.',
    errorDeletingUser:`Error deleting user`,
    userDeleted:'User deleted successfully.',

    //role Constants

    errorCheckingRole:'Error checking role existence',
    roleAlreadyExists : 'Role already exists',
    errorCreatingRole:'Error creating role',
    roleCreated:'Role created',
    noRoles:'There are no roles to display',
    rolesRetreived:'Roles retreived'

}