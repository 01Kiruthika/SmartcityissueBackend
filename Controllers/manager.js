const User = require("../Models/RegisterModels");
const bcrypt = require("bcrypt");

// CREATE MANAGER
const bcrypt = require("bcrypt");
const emailjs = require("@emailjs/nodejs");

exports.createManager = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).send({
                status: false,
                message: "Access denied"
            });
        }

        let {
            name,
            phonenumber,
            password,
            email,
            address
        } = req.body;

        // CHECK REQUIRED
        if (!name || !phonenumber || !email || !password) {
            return res.status(400).send({
                status: false,
                message: "All fields are required"
            });
        }

        // CHECK EXISTING
        let existing = await User.findOne({
            phonenumber
        });

        if (existing) {
            return res.status(400).send({
                status: false,
                message: "Manager already exists"
            });
        }

        // =========================
        // SEND EMAIL FIRST
        // =========================

        try {

            await emailjs.send(
                "service_909i4zn",
                "template_t64qt6k", {
                    name,
                    email,
                    password
                }, {
                    publicKey: "zqUfWoQbJx9clo0Qp",
                    privateKey: "WyN3jt88uLBmbT2fAl_WV"
                }
            );

        } catch (emailError) {

            return res.status(500).send({
                status: false,
                message: "Email sending failed"
            });
        }

        // =========================
        // HASH PASSWORD AFTER EMAIL
        // =========================

        const hashedPassword =
            await bcrypt.hash(password, 10);

        // CREATE MANAGER
        let manager = await User.create({
            name,
            address,
            phonenumber,
            email,
            password: hashedPassword,
            role: "manager"
        });

        return res.status(201).send({
            status: true,
            message: "Manager created successfully",
            response: manager
        });

    } catch (err) {

        console.error(err);

        return res.status(500).send({
            status: false,
            message: "Server Error"
        });
    }
};


//MANAGERS
exports.getManagers = async (req, res) => {
    try {

        let managers = await User.find({
            role: "manager"
        });

        return res.status(200).send({
            status: true,
            message: "Managers fetched successfully",
            response: managers
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};



exports.deleteManagers = async (req, res) => {
    try {
        let product_id = req.params.product_id;
        let deleted = await User.deleteOne({
            _id: Object(product_id)
        })
        if (deleted) {
            return res.status(200).send({
                status: true,
                message: "Managers Deleted Successfully",
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

exports.updateManagers = async (req, res) => {
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
                "message": "Manager Updated successfully",
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