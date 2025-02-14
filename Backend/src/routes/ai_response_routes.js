const express = require("express")
const aiResponse = require("../controller/ai_response_controller")

const router = express.Router();

router.post("/get-response" , aiResponse )



module.exports =router