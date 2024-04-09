const mongoose = require('mongoose');


const connect = mongoose.connect("mongodb+srv://shubham145000:shubham19875@cluster0.mrv9hzr.mongodb.net/Login_tut2").then(() => {
    console.log("Connected sucess");
}).catch((e) => {
    console.log(e);
})


const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const collection = new mongoose.model("user", LoginSchema)

module.exports = collection;


