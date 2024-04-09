const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { ECDH } = require('crypto');
const app = express();
const collection = require('./config')

//use EJS as the view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
// const path = require('path');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

//convert data into json format
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("login")
})


app.get("/signup", (req, res) => {
    res.render("signup")
})
//register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existuser = await collection.findOne({ name: data.name })
    if (existuser) {
        res.send("already registered");
    }
    else {
        //hash password
        const saltAround = 10;
        const hashpass = await bcrypt.hash(data.password, saltAround);
        data.password = hashpass
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
})


//login user

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username })
        if (!check) {
            res.send("user name cannot found")
        }

        //compare password from the databse
        const isPass = await bcrypt.compare(req.body.password, check.password)
        if (isPass) {
            res.render("home")
        }
        else {
            res.send("wrong auth")
        }
    } catch {
        res.send("wrong details")
    }
})



app.listen(3000, () => {
    console.log('listining');
})