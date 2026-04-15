const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUsers,
    getuser,
    deleteuser,
    updateuser,
    createAdmin,
    getadmin
} = require('../Controllers/user.js')

const {
    createManager,
    getManagers,
    updateManagers,
    deleteManagers
} = require('../Controllers/manager.js')


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



// MANAGERS
router.post("/manager", createManager);
router.get("/manager", getManagers);
router.delete("/manager/:product_id", deleteManagers);
router.put("/manager/:pro_id", updateManagers);


module.exports = router;