const mongoose = require("mongoose")
const mongo_uri = "mongodb://localhost:27017/practice?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongo_uri, ()=>{
        console.log("Connection Successfull !");
    })
}
module.exports = connectToMongo;