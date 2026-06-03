const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/authumiddleware.js");
const multer = require('multer')

const {
    registerUser,
    loginUsers,
    getuser,
    deleteuser,
    updateuser,
    createAdmin,
    getadmin,
    // assignManager
    getProfile
} = require('../Controllers/user.js')

const {
    createManager,
    getManagers,
    updateManagers,
    deleteManagers
} = require('../Controllers/manager.js')

const {
    CreateComplaint,
    getComplaints,
    deleteComplaint,
    updateComplaint,
    updateByManager,
    assignManager,
    getComplaintsByManager,
    getfiltercomplaints
} = require("../Controllers/Complaint.js")




const {
    getDashboardData
} = require("../Controllers/DashboardController.js");

// MULTER SETUP
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});


// REGISTER
router.post("/user", registerUser);


// LOGIN
router.post("/userlogin", loginUsers)
router.get("/users", verifyToken, getuser);
router.delete("/user/:product_id", verifyToken, deleteuser);
router.put("/user/:pro_id", verifyToken, updateuser);
router.get("/profile", verifyToken, getProfile);

// ADMIN
router.post("/admin", createAdmin);
router.get("/admin", verifyToken, getadmin);
router.put("/assignmanager/:complaint_id", verifyToken, assignManager)



// MANAGERS
router.post("/manager", verifyToken, createManager);
router.get("/manager", verifyToken, getManagers);
router.delete("/manager/:product_id", verifyToken, deleteManagers);
router.put("/manager/:pro_id", verifyToken, updateManagers);


// COMPLAINTS
router.post(
    "/complaint",
    verifyToken,
    upload.single("proof"),
    CreateComplaint
)
router.get("/complaint", verifyToken, getComplaints)
router.delete("/complaint/:complaint_id", verifyToken, deleteComplaint)
router.put("/complaint/:comp_id", verifyToken, upload.single("proof"), updateComplaint)
router.get("/mycomplaints", verifyToken, getfiltercomplaints)

// COMPLAINTS BY MANAGER
router.put("/managerupdate/:compl_id", verifyToken, updateByManager)
router.get("/getcomplaint/:manager_id", verifyToken, getComplaintsByManager);


// DASHBOARD COUNTS
router.get("/dashboard", verifyToken, getDashboardData);




module.exports = router;