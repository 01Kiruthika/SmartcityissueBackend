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

exports.updateComplaint = async (req, res)=> {
    try {
        let comp_id = req.params.comp_id;
        let compObj = req.body

        let Complaint_Updated = await ComplaintModel.findByIdAndUpdate(comp_id, compObj, {
            new: true
        })

        if (Complaint_Updated ) {
            return res.json({
                status: true,
                "message": "User Updated successfully",
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