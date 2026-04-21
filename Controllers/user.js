const User = require("../Models/RegisterModels");

exports.registerUser = async (req, res) => {
    try {
        let userreg = req.body;

        // prevent admin creation
        delete userreg.role;

        let userres = await User.create(userreg);

        if (userres) {
            return res.status(200).send({
                status: true,
                message: "User Registered Successfully!!",
                response: userres
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "User not saved!!",
                response: userres
            })
        }



    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }

}
exports.loginUsers = async (req, res) => {

    const {
        phonenumber,
        password,
        role
    } = req.body;

    console.log("Incoming:", req.body);

    try {

        const user = await User.findOne({
            phonenumber,
            password,
            role
        });

        if (!user) {
            return res.status(400).send({
                status: false,
                message: "Invalid phone/password/role"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Login Successful!!",
            response: user
        });

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};


exports.getuser = async (req, res) => {
    try {
        let users = await User.find({
            role: "citizen"
        });

        if (users) {
            return res.json({
                message: "Citizens Fetched successfully",
                response: users
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Citizens not Fetched!!",
                response: users
            })
        }



    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};



exports.deleteuser = async (req, res) => {
    try {
        let product_id = req.params.product_id;
        let deleted = await User.deleteOne({
            _id: Object(product_id)
        })
        if (deleted) {
            return res.status(200).send({
                status: true,
                message: "User Deleted Successfully",
                response: deleted
            })
        } else {
            return res.status(400).send({
                status: false,
                message: "Not Deleted",
                response: deleted
            })
        }
    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Exception occur",
            response: err
        })
    }
}

exports.updateuser = async (req, res) => {
    try {
        let pro_id = req.params.pro_id
        let proObj = req.body

        let updated = await User.findByIdAndUpdate(pro_id, proObj, {
            new: true
        })

        if (updated) {
            return res.json({
                status: true,
                "message": "User Updated successfully",
                response: updated
            })
        } else {
            return res.status(400).send({
                status: false,
                "message": "Not Updated ",
                response: updated
            })
        }

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Exception occur",
            response: err
        })
    }
}



// ADMIN
exports.createAdmin = async (req, res) => {
    try {
        let {
            name,
            phonenumber,
            password
        } = req.body;

        let admin = await User.findOne({
            role: "admin"
        });

        if (admin) {
            return res.send({
                message: "Admin already exists",
                response: admin
            });
        }

        // Create admin from req body
        let newAdmin = await User.create({
            name,
            phonenumber,
            password,
            role: "admin"
        });

        if (newAdmin) {
            return res.send({
                status: true,
                message: "Admin created successfully",
                response: newAdmin
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Admin not Create!!",
                response: newAdmin
            })
        }



    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error",
            error: err.message
        });
    }
};


exports.getadmin = async (req, res) => {
    try {
        let users = await User.find({
            role: "admin"
        });
        if (users) {
            return res.json({
                message: "Admin fetched successfully",
                response: users
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Admin not fetched !!",
                response: users
            })
        }



    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};
