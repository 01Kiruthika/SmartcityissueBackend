const express = require('express');
const dbconnect = require('./dbconfig/config.js');
const mainrouter = require('./routes/authRoutes.js');
const cors = require('cors')

const cityapp = express();
const port = 8010;

cityapp.use(express.json());



cityapp.use(cors())

// USING FOR ROUTES
cityapp.use("/", mainrouter);


cityapp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




































