const express = require("express");
const router =express.Router()

const Users= require("../controller/register")

router.post("/register", Users.Register);
router.get("/getall/users",Users.getallUser);
router.get("/getuser/:id",Users.getUser)

module.exports= router