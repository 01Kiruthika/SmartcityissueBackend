const ComplaintModel = require("../Models/ComplaintModels.js")
const mongoose = require("mongoose");

exports.CreateComplaint = async (req, res) => {
    try {

        console.log(req.body);

        const {
            user_id,
            user_name,
            title,
            location,
            status,
            proof
        } = req.body;

        const complaint = await ComplaintModel.create({
            user_id,
            user_name,
            title,
            location,
            status,
            proof
        });

        return res.status(201).json({
            status: true,
            message: "Complaint Created Successfully",
            response: complaint
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            status: false,
            error: err.message
        });
    }
};


exports.getComplaints = async (req, res) => {

    try {

        let getcomp = await ComplaintModel
            .find()
            .populate("user_id", "name phonenumber")
            .lean();


        return res.json({

            status: true,

            message: "Complaint Data Fetched Successfully",

            response: getcomp
        });

    } catch (err) {

        console.error(err);

        return res.status(500).send({

            status: false,

            message: "Error fetching complaints",

            error: err.message
        });
    }
};

exports.deleteComplaint = async (req, res) => {
    try {
        let req_id = req.params.complaint_id;

        let deleted = await ComplaintModel.findByIdAndDelete(req_id);

        if (deleted) {
            return res.json({
                message: "Complaint Deleted Successfully",
                response: deleted
            })
        } else {
            return res.status(400).send({
                status: false,
                message: "Complaint Not Found"
            })
        }

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error occurred!!",
            response: err
        })
    }
}

exports.updateComplaint = async (req, res) => {
    try {
        let comp_id = req.params.comp_id;
        let compObj = req.body

        let Complaint_Updated = await ComplaintModel.findByIdAndUpdate(comp_id, compObj, {
            new: true
        })

        if (Complaint_Updated) {
            return res.json({
                status: true,
                "message": "Complaint Updated successfully",
                response: Complaint_Updated
            })
        } else {
            return res.status(400).send({
                status: false,
                "message": "Not Updated ",
                response: Complaint_Updated
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



// MANAGER
exports.updateByManager = async (req, res) => {
    try {
        console.log("========== UPDATE BY MANAGER ==========");
        console.log("PARAMS:", req.params);
        console.log("BODY:", req.body);

        const comp_id = req.params.compl_id;

        const {
            status,
            completedProof
        } = req.body;

        // CHECK WHETHER COMPLAINT EXISTS
        const complaint = await ComplaintModel.findById(comp_id);

        if (!complaint) {
            return res.status(404).json({
                status: false,
                message: "Complaint not found"
            });
        }

        // UPDATE COMPLAINT
        const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
            comp_id, {
                status: status || complaint.status,
                completedProof: completedProof || complaint.completedProof,
                complaintUpdated: new Date()
            }, {
                new: true,
                runValidators: true
            }
        );

        console.log("UPDATED:", updatedComplaint);

        return res.status(200).json({
            status: true,
            message: "Complaint updated successfully",
            response: updatedComplaint
        });

    } catch (err) {

        console.log("========= UPDATE ERROR =========");
        console.log("Error Message:", err.message);
        console.log(err);

        return res.status(500).json({
            status: false,
            message: "Server Error",
            error: err.message
        });
    }
};



exports.assignManager = async (req, res) => {
    try {
        let comp_id = req.params.complaint_id

        let {
            manager_id
        } = req.body;

        const check = await ComplaintModel.findById(comp_id);

        if (!check) {
            return res.status(400).send({
                message: "Complaint not found"
            });
        }

        let updated = await ComplaintModel.findByIdAndUpdate(
            comp_id, {
                manager_id,
                status: "InProgress",
                complaintUpdated: new Date()
            }, {
                new: true
            }
        );

        return res.json({
            message: "Manager Assigned Successfully",
            response: updated
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Error",
            error: err.message
        });
    }
};


exports.getComplaintsByManager = async (req, res) => {
    try {
        const managerId = req.params.manager_id;

        const complaints = await ComplaintModel.find({
            manager_id: managerId
        });

        return res.json({
            status: true,
            message: "Manager complaints fetched successfully",
            response: complaints
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error fetching complaints",
            error: err.message
        });
    }
};

exports.getfiltercomplaints = async (req, res) => {

    try {

        const userId = new mongoose.Types.ObjectId(req.user.userId);

        const complaints = await ComplaintModel.find({
            user_id: userId
        }).lean();

        console.log("User ID:", userId);
        console.log("Complaints:", complaints);

        return res.json({
            status: true,
            response: complaints
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: "Error fetching complaints",
            error: err.message
        });

    }
};