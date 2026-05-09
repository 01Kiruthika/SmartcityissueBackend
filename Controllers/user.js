const User = require("../Models/RegisterModels");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    try {
        let userreg = req.body;

        if (!userreg.name || !userreg.phonenumber || !userreg.password) {
            return res.status(400).send({
                status: false,
                message: "All fields required"
            });
        }
        if (userreg.password.length < 8) {

            return res.status(400).send({
                status: false,
                message: "Password must be at least 8 characters"
            });
        }

        const hashedPassword = await bcrypt.hash(userreg.password, 10);
        userreg.password = hashedPassword;

        let userres = await User.create(userreg);

        return res.status(200).send({
            status: true,
            message: "User Registered Successfully!!",
            response: userres
        });

    } catch (err) {

        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
};
exports.loginUsers = async (req, res) => {

    const {
        phonenumber,
        password,
        role
    } = req.body;

    try {

        const user = await User.findOne({
            phonenumber,
            role
        });

        if (!user) {
            return res.status(400).send({
                status: false,
                message: "User Not found!!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                status: false,
                message: "Invalid password"
            });
        }

        //  Generate JWT Token
        const token = jwt.sign({
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET, {
                expiresIn: "1d"
            }
        );

        return res.status(200).send({
            status: true,
            message: "Login Successful!!",
            token,
            userId: user._id,
            role: user.role,
            name: user.name
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

        if (proObj.password) {
            proObj.password = await bcrypt.hash(proObj.password, 10);
        }

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
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin from req body
        let newAdmin = await User.create({
            name,
            phonenumber,
            password: hashedPassword,
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


exports.getProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await User
            .findById(userId)
            .select("-password")
            .lean();

        if (!user) {

            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Profile fetched successfully",
            response: user
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Error fetching profile",
            error: err.message
        });
    }
};