require("dotenv").config();
const app = require("./src/app")

app.listen(3000 , () => {
    console.log("Server is running at port 3000")
})

app.get("/" , (req , res) => {
    res.status(200).json({
        message : "Hello everyone"
    })
})