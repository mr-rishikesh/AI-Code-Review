// groq-code-review-simple.service.js
// All-in-one version - no separate files needed

require('dotenv').config(); // or your env config
const Groq = require("groq-sdk").default;

const groq = new Groq({
  apiKey: process.env.GROQ_APIKEY,
});

// Code review prompt
const codeReviewPrompt = `
You are an expert code reviewer with deep knowledge of software engineering best practices, security, performance optimization, and clean code principles.

Your task is to analyze the provided code and give comprehensive, actionable feedback.

Focus on:
1. **Code Quality**: Readability, maintainability, and adherence to best practices
2. **Potential Bugs**: Logic errors, edge cases, and potential runtime issues
3. **Security**: Vulnerabilities, injection risks, and security best practices
4. **Performance**: Optimization opportunities, algorithmic efficiency, and resource usage
5. **Best Practices**: Design patterns, coding standards, and language-specific conventions
6. **Suggestions**: Concrete improvements with code examples where helpful

Provide your review in a clear, structured markdown format that is easy to read and understand.
Be constructive, specific, and provide examples when suggesting improvements.
`;

async function generateCodeReview(code) {
  try {
    const prompt = `
${codeReviewPrompt}

## Code to Review:
\`\`\`
${code}
\`\`\`

Please provide a comprehensive code review with actionable feedback.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "You are an expert code reviewer. Provide detailed, constructive feedback on code quality, security, performance, and best practices. Format your response in clear markdown." 
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Extract the text from model output
    const reviewText = 
      response?.choices?.[0]?.message?.content?.trim() ||
      response?.choices?.[0]?.message?.reasoning?.trim();
    
    if (!reviewText) throw new Error("Model returned empty content");

    return reviewText;
    
  } catch (err) {
    console.error("❌ Error generating code review:", err);
    throw new Error(`Failed to generate code review: ${err.message}`);
  }
}

module.exports = generateCodeReview;