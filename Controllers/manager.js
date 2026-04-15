const User = require("../Models/RegisterModels");


// MANAGER
exports.createManager = async (req, res) => {
    try {
        let { name, phonenumber, password } = req.body;

        // check existing user
        let existing = await User.findOne({ phonenumber });

        if (existing) {
            return res.status(400).send({
                status: false,
                message: "Manager already exists"
            });
        }

        let manager = await User.create({
            name,
            phonenumber,
            password,
            role: "manager"
        });

        return res.status(201).send({
            status: true,
            message: "Manager created successfully",
            response: manager
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error",
            response: err.message
        });
    }
};



//MANAGERS
exports.getManagers = async (req, res) => {
    try {

        let managers = await User.find({ role: "manager" });

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