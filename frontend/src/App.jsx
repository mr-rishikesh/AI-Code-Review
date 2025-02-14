import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
//import "prismjs/components/prism-jsx"
import prism from "prismjs"
import './App.css'
import axios from "axios"
// below markdown is used for the styling of the response
import Markdown from "react-markdown"
//import { response } from '../../Backend/src/app'

function App() {
  const [count, setCount] = useState(0)
  const [code , setCode] = useState(`function sum() {return 2+2}`)
  const [review , setReview] = useState(`wfunction sum() {return 2+2}`)
 
  // this below is used for the highlisting the code 

  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode() {
    setReview(`Review is generating........`)

    console.log("Sending data:", { code }); // Debugging step
    try {
      const response = await axios.post('http://localhost:3000/ai/get-response', { code }, {
        headers: {
          "Content-Type": "application/json" // Ensure correct headers
        }
      });
      setReview(response.data.data.toString())
    console.log("Response:", response.data);
    } catch (error) {
    console.error(" Got an Error response:", error.response?.data || error.message);
    }
  }
  

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
        <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
        <div onClick={reviewCode} className="button">Review</div> 
      </div>
      </div>
      <div className="right"> <Markdown>{review}</Markdown> </div>
    </main>
    </>
  )
}

export default App
