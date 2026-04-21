const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUsers,
    getuser,
    deleteuser,
    updateuser,
    createAdmin,
    getadmin,
    // assignManager
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
    assignManager
} = require("../Controllers/Complaint.js")





// REGISTER
router.post("/user", registerUser);
// LOGIN
router.post("/userlogin", loginUsers)
router.get("/users", getuser);
router.delete("/user/:product_id", deleteuser);
router.put("/user/:pro_id", updateuser);

// ADMIN
router.post("/admin", createAdmin);
router.get("/admin", getadmin);


router.put("/assignmanager/:complaint_id", assignManager)



// MANAGERS
router.post("/manager", createManager);
router.get("/manager", getManagers);
router.delete("/manager/:product_id", deleteManagers);
router.put("/manager/:pro_id", updateManagers);


// COMPLAINTS

router.post("/complaint", CreateComplaint)
router.get("/complaint", getComplaints)
router.delete("/complaint/:complaint_id", deleteComplaint)
router.put("/complaint/:comp_id", updateComplaint)


// COMPLAINTS BY MANAGER
router.put("/managerupdate/:compl_id", updateByManager)




module.exports = router;