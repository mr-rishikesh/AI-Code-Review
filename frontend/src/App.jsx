import { useState, useEffect, useRef } from 'react'
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import './App.css'
import axios from "axios"
import Markdown from "react-markdown"

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 2 + 2\n}`)
  const [review, setReview] = useState(`# Welcome to AI Code Reviewer 🚀\n\nPaste your code in the editor and click **Review** to get instant AI-powered feedback!\n\n### Features:\n- Real-time syntax highlighting\n- Intelligent code analysis\n- Best practices recommendations\n- Performance optimization tips`)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [lineCount, setLineCount] = useState(3)
  const reviewRef = useRef(null)

  useEffect(() => {
    prism.highlightAll()
  }, [code])

  useEffect(() => {
    const lines = code.split('\n').length
    setLineCount(lines)
  }, [code])

  async function reviewCode() {
    if (!code.trim()) {
      setError("Please enter some code to review")
      return
    }

    setIsLoading(true)
    setError(null)
    setReview(`# 🔍 Analyzing your code... \n\n Please wait For few Seconds  while our AI examines and gives feeback to  your code for:\n- Syntax errors\n- Logic issues\n- Performance optimizations\n- Best practices\n- Security vulnerabilities`)
    
    try {
      const response = await axios.post('http://localhost:3000/ai/get-response', { code }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setReview(response.data.data.toString())
      
      // Smooth scroll to review
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Failed to get review. Please check if the server is running.")
      setReview(`# ❌ Error\n\nFailed to connect to the review service. Please ensure:\n- The backend server is running on port 3000\n- Your network connection is stable\n- CORS is properly configured`)
    } finally {
      setIsLoading(false)
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function clearCode() {
    setCode('')
    setReview(`# Welcome to AI Code Reviewer 🚀\n\nPaste your code in the editor and click **Review** to get instant AI-powered feedback!`)
  }

  function handleKeyPress(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      reviewCode()
    }
  }

  return (
    <div className={`app-container ${theme}`}>
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="app-title">AI Code Reviewer</h1>
              <p className="app-subtitle">Intelligent code analysis powered by AI</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel - Code Editor */}
        <div className="editor-panel">
          <div className="panel-header">
            <div className="panel-title">
              <span className="title-icon">📝</span>
              <span>Code Editor</span>
            </div>
            <div className="editor-stats">
              <span className="stat-badge">{lineCount} lines</span>
              <span className="stat-badge">{code.length} chars</span>
            </div>
          </div>
          
          <div className="editor-container">
            <div className="editor-wrapper">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                onKeyDown={handleKeyPress}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={20}
                style={{
                  fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", monospace',
                  fontSize: 15,
                  lineHeight: 1.6,
                  minHeight: '100%',
                  outline: 'none'
                }}
                placeholder="// Paste your code here..."
              />
            </div>
          </div>

          <div className="editor-actions">
            <button 
              onClick={reviewCode} 
              className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Review Code
                  <span className="shortcut">Ctrl+Enter</span>
                </>
              )}
            </button>
            <button onClick={copyCode} className="btn btn-secondary">
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
            <button onClick={clearCode} className="btn btn-secondary">
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Right Panel - Review Results */}
        <div className="review-panel" ref={reviewRef}>
          <div className="panel-header">
            <div className="panel-title">
              <span className="title-icon">🤖</span>
              <span>AI Review</span>
            </div>
            {isLoading && (
              <div className="loading-indicator">
                <span className="pulse"></span>
                <span>Analyzing</span>
              </div>
            )}
          </div>

          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="review-container">
            <div className="review-content">
              <Markdown>{review}</Markdown>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to review </p>
      </footer>
    </div>
  )
}

export default App