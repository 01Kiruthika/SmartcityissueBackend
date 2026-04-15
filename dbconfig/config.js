const mongoose = require('mongoose')

let dbconnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/smartcityms')
        console.log("DB Connected Successfully!!!");
    }catch(err){
        console.log("DB Connection Error",err);
    }
}

dbconnect()