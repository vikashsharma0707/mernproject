// const express = require("express");
// const app = express();
// const mongoose =require("mongoose");
// const cors = require("cors");
// const bodyparser = require('body-parser');
// const adminRoute = require("./Routes/adminRoute")
// require("dotenv").config();

// const PORT=process.env.PORT || 8080
// app.use(cors());

// // Body-parser middleware
// app.use(bodyparser.urlencoded({ extended: true }))
// app.use(bodyparser.json())

// app.use("/adminuser",adminRoute);

// mongoose.connect(process.env.DBCON).then(()=>{
//     console.log("DB Connected!!!");
// })

// app.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
// })


const express = require("express");
const app= express();
const mongoose= require("mongoose");
const cors= require("cors");
const bodyparser = require('body-parser')
const userRoute= require("./Route/taskRoute")
const userLogin = require("./Route/userRoute")
const adminRoute = require("./Route/adminRoute")
const showRoute = require("./Route/taskDataRoute")


require("dotenv").config();
const PORT=process.env.PORT || 8080

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.use("/userTask", userRoute);
app.use("/userLog",userLogin)
app.use("/adminUser",adminRoute)
app.use("/taskshow",showRoute)




mongoose.connect(process.env.DBCON).then(()=>{
    console.log("DB Connected!!!");
})


app.listen(PORT, ()=>{
    console.log(`server run on ${PORT}`)
});