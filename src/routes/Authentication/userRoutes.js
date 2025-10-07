const express = require("express");
const router = express.Router();

// Controllers
const createUser =require("../../controllers/users/createUser").createUser;
const loginUser = require("../../controllers/users/loginUser").loginUser;
const getAllUsers =require("../../controllers/users/getAllUsers").getAllUsers;
const getUserById =require("../../controllers/users/getUserById").getUserById;
const updateUser =require("../../controllers/users/updateUser").updateUser;
const deleteUser =require("../../controllers/users/deleteUser").deleteUser;
const blockUser = require("../../controllers/blocks/blockUser").blockUser;
const getBlockById =require("../../controllers/blocks/getBlockById").getBlockById;
const getUserBlocks =require("../../controllers/blocks/getUserBlocks").getUserBlocks;
const deleteBlock = require("../../controllers/blocks/deleteBlock").deleteBlock;
// Middlewares
const authenticate = require("../../middlewares/auth/authenticate");
const authorizeUpdateUser = require("../../middlewares/auth/authorizeUpdateUser");
const authorizeDeleteUser = require("../../middlewares/auth/authorizeDeleteUser");
const validateUpdateUserBody = require("../../middlewares/user/validateUpdateUserBody");
const preventUserChangingAdminStatus = require("../../middlewares/auth/preventUserChangingAdminStatus");
const authorizeAdmin = require("../../middlewares/auth/authorizeAdmin");
const preventBlockingAdmin = require("../../middlewares/auth/preventBlockingAdmin");
const checkUserExists = require("../../middlewares/user/checkUserExists");
const validateRegisterBody = require("../../middlewares/user/validateRegisterBody");
const checkUniqueUserFields = require("../../middlewares/user/checkUniqueUserFields");
const checkCityUpdateFields = require("../../middlewares/city/checkCityUpdateFields");
const validateLoginBody = require("../../middlewares/user/validateLoginBody");
const checkUserExistsByUsername = require("../../middlewares/user/checkUserExistsByUsername");
const verifyPassword = require("../../middlewares/auth/verifyPassword");
const preventBlockingSelf = require("../../middlewares/block/preventBlockingSelf");
const resolveCity = require("../../middlewares/city/resolveCity");
const checkUserBlock = require("../../middlewares/block/checkUserBlock");
const checkUniqueUserFieldsForUpdate = require("../../middlewares/user/checkUniqueUserFieldsForUpdate")
const validateBlockBody = require("../../middlewares/block/validateBlockBody")
const pagination = require("../../middlewares/pagination/pagination")

router.get("/meus-bloqueios", authenticate, pagination, getUserBlocks); 
router.post("/register", validateRegisterBody, checkUniqueUserFields, resolveCity, createUser);
router.post("/login", validateLoginBody, checkUserExistsByUsername, verifyPassword, loginUser); 
router.get("/", authenticate, authorizeAdmin, pagination, getAllUsers);
router.get("/:id", authenticate, authorizeAdmin, getUserById );
router.patch("/:id",authenticate,validateUpdateUserBody,authorizeUpdateUser,preventUserChangingAdminStatus, checkUserExists,checkUniqueUserFieldsForUpdate, checkCityUpdateFields, resolveCity, updateUser );
router.delete("/:id", authenticate, authorizeDeleteUser, deleteUser );
router.post("/bloqueios/:id", authenticate, validateBlockBody, preventBlockingSelf, preventBlockingAdmin, checkUserBlock, blockUser );
router.get("/bloqueios/:id", authenticate, authorizeAdmin, getBlockById); 
router.delete("/bloqueios/:id", authenticate, deleteBlock);
module.exports = router;
