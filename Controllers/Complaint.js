const ComplaintModel = require("../Models/ComplaintModels.js")

exports.CreateComplaint = async (req, res) => {

    try {
        console.log(req.body);
        let complaintdetails = req.body
        let complaint = await ComplaintModel.create(complaintdetails)

        if (complaint) {
            return res.json({
                message: "Complaint Save successfully!!",
                response: complaint
            })
        } else {
            return res.json({
                message: "Sorry,Complaint Not Save!!",
                response: complaint.message
            })
        }

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error is occur!!!",
            response: err
        })

    }
}


exports.getComplaints = async (req, res) => {
    try {
        let getcomp = await ComplaintModel.find()
        if (getcomp) {
            return res.json({
                message: "Complaint Data Fetched successfully!!!",
                response: getcomp
            })
        } else {
            return res.json({
                message: "Sorry,Complaint Data Not Fetch"
            })
        }
    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Error is occur!!",
            response: err
        })

    }
}

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

        let comp_id = req.params.comp_id;

        let {
            status,
            completedProof
        } = req.body;

        let updated = await ComplaintModel.findByIdAndUpdate(
            comp_id, {
                status: status || "Solved",
                completedProof: completedProof || null,
                complaintUpdated: new Date()
            }, {
                new: true
            }
        );

        if (updated) {
            return res.json({
                message: "Complaint Updated by Manager ",
                response: updated
            });
        } else {
            return res.status(400).send({
                message: "Complaint Not Found"
            });
        }

    } catch (err) {
        return res.status(400).send({
            message: "Error",
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

        console.log("ID:", comp_id);

        console.log("PARAM:", comp_id);
        console.log("BODY:", manager_id);

        const check = await ComplaintModel.findById(comp_id);
        console.log("CHECK FIND:", check);

        if (!check) {
            return res.status(400).send({
                message: "Complaint not found"
            });
        }

        let updated = await ComplaintModel.findByIdAndUpdate(
            comp_id, {
                manager_id, // ✅ correct field
                status: "InProgress", // ✅ must match ENUM
                complaintUpdated: new Date()
            }, {
                new: true
            }
        );

        console.log("UPDATED:", updated);

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