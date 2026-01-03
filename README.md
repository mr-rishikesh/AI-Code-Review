# AI Code Reviewer

An AI-powered code review application that provides instant feedback on code quality, bugs, security, and best practices using Groq's LLaMA 3.3 70B model.


## Features

-  **Real-time Code Editor** - Syntax highlighting with Prism.js
-  **AI-Powered Reviews** - Comprehensive code analysis using Groq AI
-  **Modern UI** - Dark/light theme, responsive design, glassmorphism effects
-  **Keyboard Shortcuts** - Ctrl/Cmd + Enter to review
-  **Copy/Clear Actions** - Easy code management

## Tech Stack

**Frontend:** React, Vite, Prism.js, react-markdown, Axios  
**Backend:** Node.js, Express, Groq SDK  
**AI Model:** LLaMA 3.3 70B Versatile

## Installation

### Prerequisites
- Node.js 19
- Groq API key ([Get one here](https://console.groq.com/))

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/mr-rishikesh/AI-Code-Review.git
cd ai-code-reviewer
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configure environment variables**

Create `backend/.env`:
```env
GROQ_APIKEY=your_groq_api_key_here
```

4. **Run the application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

## Usage

1. **Paste your code** in the editor (left panel)
2. **Click "Review Code"** or press `Ctrl/Cmd + Enter`
3. **View AI feedback** in the review panel (right panel)

### API Endpoint

```bash
POST http://localhost:3000/ai/get-response
Content-Type: application/json

```

## Project Structure

```
ai-code-reviewer/
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry point
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ai.controller.js
│   │   │   └── groq-code-review-simple.service.js
│   ├── server.js            # Server entry
│   └── package.json
│
└── README.md
```

## Configuration

### Backend Service

The AI service (`backend/src/services/groq-code-review-simple.service.js`) uses:
- **Model:** `llama-3.3-70b-versatile`
- **Temperature:** `0.7`
- **Max Tokens:** `2000`

### Customization

Change the AI prompt in `groq-code-review-simple.service.js`:
```javascript
const codeReviewPrompt = `
Your custom prompt here...
`;
```

## Troubleshooting

**CORS Errors:**
```javascript
// backend/src/app.js
app.use(cors({
  origin: ['http://localhost:5173']
}));
```

**Groq API Issues:**
- Verify API key in `.env`
- Check [Groq status](https://status.groq.com/)
- Restart backend server after updating `.env`

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/ai-code-reviewer/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/ai-code-reviewer/discussions)

---

Made with ❤️ using React and Groq AI
