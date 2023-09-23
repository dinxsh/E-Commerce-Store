const express = require('express')
const { Register, login, logout, ForgotPassword, resetPassword,
    getUserDetails, updateUserDetails, updateProfile, getAllusers,
    getUser, DeleteProfile, updateRole} 
    = require('../controllers/user')
const {isAuthenticated, admin} = require('../middlewares/auth')
const router = express.Router()

router.route('/register').post(Register) 
router.route('/login').post(login) 
router.route('/logout').get(logout) 
router.route('/password/forgot').post(ForgotPassword) 
router.route('/password/reset/:token').put(resetPassword)
router.route('/Myprofile').get(isAuthenticated,getUserDetails)
router.route('/UpdatePassword').put(isAuthenticated,updateUserDetails)
router.route('/UpdateProfile').put(isAuthenticated, updateProfile)


//admin routes
router.route('/getAllUsers').get(isAuthenticated,admin("admin"),getAllusers)
router.route('/getUser/:id')
.get(isAuthenticated,admin("admin"),getUser)
.delete(isAuthenticated,admin("admin"),DeleteProfile).put(isAuthenticated,admin("admin"),updateRole)

module.exports = router
