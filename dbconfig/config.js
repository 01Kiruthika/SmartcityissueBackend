const mongoose = require('mongoose')

let dbconnect = async () => {
    try {
        await mongoose.connect(
            'mongodb://kiruthika:kiruthika2004@ac-9pgqiaf-shard-00-00.zfcxtuh.mongodb.net:27017,ac-9pgqiaf-shard-00-01.zfcxtuh.mongodb.net:27017,ac-9pgqiaf-shard-00-02.zfcxtuh.mongodb.net:27017/smartcityms?ssl=true&replicaSet=atlas-6bf20p-shard-0&authSource=admin&retryWrites=true&w=majority'
        );
        console.log("DB Connected Successfully!!!");
    } catch (err) {
        console.log("DB Connection Error", err);
    }
}

dbconnect()