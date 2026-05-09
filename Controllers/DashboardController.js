const ComplaintModel = require("../Models/ComplaintModels.js");
const User = require("../Models/RegisterModels.js");

exports.getDashboardData = async (req, res) => {
    try {

        // TOTAL COUNTS
        const totalComplaints = await ComplaintModel.countDocuments();

        const totalUsers = await User.countDocuments({
            role: "citizen"
        });

        const totalManagers = await User.countDocuments({
            role: "manager"
        });

        // GET ALL COMPLAINTS
        const complaints = await ComplaintModel.find();

        return res.status(200).json({
            status: true,
            message: "Dashboard data fetched successfully",

            response: {
                totalComplaints,
                totalUsers,
                totalManagers,
                complaints
            }
        });

    } catch (err) {

        return res.status(400).json({
            status: false,
            message: "Error fetching dashboard data",
            error: err.message
        });

    }
};