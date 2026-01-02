// ai.controller.js
// Simple version - matches your original Gemini structure

const aiService = require("./groqService.js");

const aiResponse = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({
            message: "Please provide code"
        });
    }
    
    console.log(code);
    
    const result = await aiService(code);

    res.status(200).json({
        data: result
    });
};

module.exports = aiResponse;