const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Controllers
const getTreesByUserCity = require('../../controllers/trees/getTreesByUserCity').getTreesByUserCity;
const createTree = require('../../controllers/trees/createTree').createTree;
const updateTree = require('../../controllers/trees/updateTree').updateTree;
const deleteTree = require('../../controllers/trees/deleteTree').deleteTree;
const sendPhoto = require('../../controllers/photos/sendPhoto').sendPhoto;
const deletePhoto = require('../../controllers/photos/deletePhoto').deletePhoto;
const getTreeById = require('../../controllers/trees/getTreebyId').getTreeById;
const saveAndSendQRCode = require('../../controllers/trees/saveAndSendQRCode').saveAndSendQRCode;
const filterTrees = require('../../controllers/trees/filterTree').filterTrees; 
const reportTreeError = require('../../controllers/moderations/reportTreeError').reportTreeError;
const getModerationsByCity = require('../../controllers/moderations/getModerationsByCity').getModerationsByCity ;
const getModerationsByTreeId = require('../../controllers/moderations/getModerationsByTreeId').getModerationsByTreeId;
const deleteTreeModerationById= require('../../controllers/moderations/deleteTreeModerationById').deleteTreeModerationById;
const changeModerationStatus = require('../../controllers/moderations/changeModerationStatus').changeModerationStatus;
const getPhotosByTreeId = require('../../controllers/photos/getPhotosByTreeId').getPhotosByTreeId
const getAllModerations = require('../../controllers/moderations/getAllModerations').getAllModerations;

//Middlewares
const authenticate = require('../../middlewares/auth/authenticate');
const authorizeSameCityByTreeId = require('../../middlewares/tree/authorizeSameCityByTreeId');
const authorizeAdmin = require('../../middlewares/auth/authorizeAdmin');
const authorizeTreeOwnerOrAdminPatch = require('../../middlewares/tree/authorizeTreeOwnerOrAdminPatch');
const authorizeTreeOwnerOrAdminDelete = require('../../middlewares/tree/authorizeTreeOwnerOrAdminDelete');
const uploads = require('../../middlewares/upload')
const filterBlockedContent = require('../../middlewares/filter/filterBlockedContent');
const loadUserBlocks = require('../../middlewares/block/loadUserBlocks');
const requireUserCity = require('../../middlewares/city/requireUserCity');
const filterBuilder = require('../../middlewares/filter/filterBuilder')
const excludeBlockedUsersFromFilter = require('../../middlewares/block/excludeBlockedUsersFromFilter')
const blockIfUserOrOwnerBlocked = require('../../middlewares/block/blockIfUserOrOwnerBlocked')
const blockIfTreeFromAnotherCity = require('../../middlewares/block/blockIfTreeFromAnotherCity')
const loadTree = require('../../middlewares/tree/loadTree')
const incrementTreeViewCount = require('../../middlewares/tree/incrementTreeViewCount');
const validateTreeBody = require('../../middlewares/tree/validateTreeBody');
const verifyTreeBelongsToUser = require('../../middlewares/tree/verifyTreeBelongsToUser')
const loadPhoto = require('../../middlewares/photo/loadPhoto');
const authorizeDeletePhotoOwnerOrAdmin =  require('../../middlewares/photo/authorizeDeletePhotoOwnerOrAdmin')
const generateQrCodeImage = require('../../middlewares/qrcode/generateQrCodeImage')
const validateModerationStatusMarking = require('../../middlewares/moderation/validateModerationStatusMarking')
const findModeration = require('../../middlewares/moderation/findModeration')
const loadAccessibleTrees = require("../../middlewares/tree/loadAccessibleTrees");
const filterBlockedUsers = require("../../middlewares/filter/filterBlockedUsers")
const blockReportIfYourOwnTree = require("../../middlewares/block/blockReportIfYourOwnTree")
const checkAdminCityRestriction = require("../../middlewares/city/checkAdminCityRestriction")
const prepareTreeFilters = require("../../middlewares/filter/prepareTreeFilters")
const validateModerationBody = require("../../middlewares/moderation/validateModerationBody")
const validateUpdateTreeBody = require('../../middlewares/tree/validateUpdateTreeBody');
const pagination = require("../../middlewares/pagination/pagination")

router.get('/', authenticate, requireUserCity, loadUserBlocks, pagination, loadAccessibleTrees , filterBlockedUsers,  getTreesByUserCity);
router.post('/', authenticate, validateTreeBody, checkAdminCityRestriction, createTree); 
router.post('/filtrar', authenticate,  prepareTreeFilters, filterBuilder, loadUserBlocks, excludeBlockedUsersFromFilter, pagination, filterTrees);
router.get('/erro', authenticate, authorizeAdmin, pagination, getAllModerations)
router.post('/foto', authenticate, uploads.single('photo'), verifyTreeBelongsToUser,  sendPhoto ) 
router.get('/:id', authenticate, loadTree, authorizeSameCityByTreeId,  incrementTreeViewCount, filterBlockedContent, getTreeById ); 
router.patch('/:id', authenticate, validateUpdateTreeBody, loadTree, authorizeTreeOwnerOrAdminPatch, updateTree); 
router.delete('/:id', authenticate, loadTree, authorizeTreeOwnerOrAdminDelete, deleteTree); 
router.get('/foto/:id', authenticate, loadTree, loadUserBlocks, blockIfTreeFromAnotherCity, blockIfUserOrOwnerBlocked, pagination, getPhotosByTreeId)
router.delete('/foto/:id', authenticate, loadPhoto, authorizeDeletePhotoOwnerOrAdmin, deletePhoto); 
router.get('/qrcode/:id', authenticate, loadTree, blockIfTreeFromAnotherCity, loadUserBlocks, blockIfUserOrOwnerBlocked, generateQrCodeImage, saveAndSendQRCode)
router.post('/moderacao/:id', authenticate, validateModerationBody,loadUserBlocks, loadTree,  blockIfTreeFromAnotherCity, blockIfUserOrOwnerBlocked, blockReportIfYourOwnTree, reportTreeError)
router.get('/moderacao/:id', authenticate, authorizeAdmin, loadTree, pagination,  getModerationsByTreeId);
router.get('/admin/moderacao/:id', authenticate, authorizeAdmin, pagination, getModerationsByCity );
router.patch('/moderacao/:id', authenticate, authorizeAdmin, validateModerationStatusMarking, findModeration, changeModerationStatus);
router.delete('/moderacao/:id', authenticate, authorizeAdmin, loadTree, findModeration, deleteTreeModerationById);

module.exports = router;