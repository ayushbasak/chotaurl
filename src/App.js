import './App.css';
import axios from 'axios'
import { useState } from 'react'
import Navbar from './components/Navbar.components'
import Main from './components/Main.components'
import Footer from './components/Footer.components'

const App = ()=>{
  // current value of URL input
  const [curr, setCurr] = useState('')
  // flavor
  const [flavor, setFlavor] = useState('')
  // final shortened URL
  const [final, setFinal] = useState('')
  // const [enableFlavor, setEnableFlavor] = useState(true)
  const handleInputChange = (e)=>{
    setCurr(e.target.value)
  }
  const handleFlavorChange = (e)=>{
    let temp = e.target.value
    if(temp.length > 20)
      temp = temp.substring(0, 20)
    setFlavor(temp)
  }
  const postURL = async ()=>{
    const save = {"url": curr}
    if(flavor !== "")
      save['flavor'] = flavor
    
      console.log(save)
    const result = await axios.post('https://ctlnk.herokuapp.com', save)
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
      <Main chandler={handleInputChange} flavorHandler = {handleFlavorChange}
       post={postURL} final={final} copy={copy} flavor={flavor}/>
      <Footer />
    </div>
  );
}

export default App;
