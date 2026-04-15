const User = require("../Models/RegisterModels");

exports.registerUser = async (req, res) => {
    try {
        let userreg = req.body;

        // prevent admin creation
        delete userreg.role;

        let userres = await User.create(userreg);

        return res.status(201).send({
            status: true,
            message: "User Registered Successfully!!",
            response: userres
        });

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }

}

exports.loginUsers = async (req, res) => {

    let {
        phonenumber,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            phonenumber
        });

        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User Not Found!!"
            });
        }

        if (user.password !== password) {
            return res.status(400).send({
                status: false,
                message: "Invalid Password!!"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Login Successful!!",
            response: user
        });

    } catch (err) {
        return res.status(500).send({
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

        return res.json({
            message: "Citizens fetched successfully",
            response: users
        });

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

exports.updateUser = async (req, res) => {
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

        let admin = await User.findOne({ role: "admin" });

        if (admin) {
            return res.send({
                message: "Admin already exists"
            });
        }

        let newAdmin = await User.create({
            name: "admin",
            phonenumber: "9999999999",
            password: "admin",
            role: "admin"
        });

        return res.send({
            message: "Admin created successfully",
            response: newAdmin
        });

    } catch (err) {
        return res.status(500).send({
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

        return res.json({
            message: "Admin fetched successfully",
            response: users
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};

