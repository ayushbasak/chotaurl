import './App.css';
import axios from 'axios'
import { useState } from 'react'
import Navbar from './components/Navbar.components'
import Main from './components/Main.components'
import Footer from './components/Footer.components'

const App = ()=>{
  // current value of URL input
  const [curr, setCurr] = useState('')
  // final shortened URL
  const [final, setFinal] = useState('')
  
  const handleInputChange = (e)=>{
    setCurr(e.target.value)
  }

  const postURL = async ()=>{
    const result = await axios.post('https://ctlnk.herokuapp.com/', {"url": curr})
                            .catch(err => console.log(err))
    if(result === undefined){
      return
    }
    if(result.data.errorId === 2 || result.data.errorId === 1)
      setFinal(result.data.error)
    else{
      setFinal(result.data.shortenedURL)
    }
  }
  const copy = ()=>{
    navigator.clipboard.writeText(final)
    window.open(final, "_blank")
  }

  return (
    <div className="h-screen">
      <Navbar />
      <Main chandler={handleInputChange} post={postURL} final={final} copy={copy}/>
      <Footer />
    </div>
  );
}

export default App;
