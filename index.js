require("dotenv").config();

const express = require('express');
const dbconnect = require('./dbconfig/config.js');
const mainrouter = require('./routes/authRoutes.js');
const cors = require('cors')
const dns = require('dns')


dns.setServers(["1.1.1.1","8.8.8.8"])


const cityapp = express();
const port = 8011;


cityapp.use(cors())
// cityapp.use(express.json());

cityapp.use(express.json({
    limit: "10mb"
}));

cityapp.use(express.urlencoded({
    limit: "10mb",
    extended: true
}));



// USING FOR ROUTES
cityapp.use("/", mainrouter);


cityapp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});