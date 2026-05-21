require("dotenv").config();

const express = require('express');
const dbconnect = require('./dbconfig/config.js');
const mainrouter = require('./routes/authRoutes.js');
const cors = require('cors');
const dns = require('dns');

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const cityapp = express();

//  CORS
cityapp.use(cors());

cityapp.use(express.json({ limit: "10mb" }));
cityapp.use(express.urlencoded({
    limit: "10mb",
    extended: true
}));

//  Routes
cityapp.use("/", mainrouter);

//  IMPORTANT FIX
const port = process.env.PORT || 8011;

cityapp.listen(port, () => {
    console.log(`Server running on port ${port}`);
});