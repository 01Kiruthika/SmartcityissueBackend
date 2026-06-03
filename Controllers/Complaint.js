const ComplaintModel = require("../Models/ComplaintModels.js")

exports.CreateComplaint = async (req, res) => {
try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
        user_id,
        user_name,
        title,
        location,
        status
    } = req.body;

    // Validation
    if (!user_id || !user_name || !title || !location) {
        return res.status(400).json({
            status: false,
            message: "All required fields must be filled"
        });
    }

    // ObjectId Validation
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({
            status: false,
            message: "Invalid user_id"
        });
    }

    // Image Upload
    let proof = null;

    if (req.file) {
        proof = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    }

    const complaint = await ComplaintModel.create({
        user_id,
        user_name,
        title,
        location,
        proof,
        status: status || "Pending"
    });

    return res.status(201).json({
        status: true,
        message: "Complaint Saved Successfully",
        response: complaint
    });

} catch (err) {

    console.error("Complaint Create Error:", err);

    return res.status(500).json({
        status: false,
        message: err.message
    });
}

};

// exports.CreateComplaint = async (req, res) => {

//     try {

//         const {
//             user_id,
//             user_name,
//             title,
//             location,
//             status
//         } = req.body;

//         // IMAGE FILE
//         let proof = "";
//         if (req.file) {
//             proof =
//                 `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//         }


//         // VALIDATION
//         if (
//             !user_id ||
//             !user_name ||
//             !title ||
//             !location
//         ) {

//             return res.status(400).json({

//                 status: false,

//                 message: "All required fields must be filled"
//             });
//         }




//         // CREATE
//         const complaint =
//             await ComplaintModel.create({

//                 user_id,
//                 user_name,
//                 title,
//                 location,
//                 proof,
//                 status
//             });




//         return res.status(201).json({

//             status: true,

//             message: "Complaint Saved Successfully",

//             response: complaint
//         });

//     } catch (err) {

//         console.error(err);

//         return res.status(500).json({

//             status: false,

//             message: "Error occurred",

//             error: err.message
//         });
//     }
// };

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

        const comp_id = req.params.compl_id;

        const {
            status,
            completedProof
        } = req.body;



        const updated = await ComplaintModel.findByIdAndUpdate(
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
                status: true,
                message: "Complaint Updated by Manager",
                response: updated
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "Complaint Not Found"
            });
        }

    } catch (err) {
        return res.status(500).send({
            status: false,
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

        const userId = req.user.userId;

        const complaints = await ComplaintModel
            .find({
                user_id: userId
            })
            .lean();

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