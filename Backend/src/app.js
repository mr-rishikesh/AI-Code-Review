const express = require("express");
const router = require("./routes/ai_response_routes")
const cors = require("cors")

const app = express();
// generally express dont share data with anyone even to the frontend so we uses cors for the problem
app.use(cors())
app.use(express.json())

app.use("/ai" , router)
module.exports = app