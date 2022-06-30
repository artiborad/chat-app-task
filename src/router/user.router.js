const router= require('express').Router()
const user = require("../controller/user.controller")

// router.post('/createuser', function(req, res){
//     console.log("ertyu");
//     user.create
//   });
router.post('/createuser',user.create)

module.exports =  { router }