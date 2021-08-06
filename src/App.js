import './App.css';
import axios from 'axios'
import { useState } from 'react'
import Navbar from './components/Navbar.components'
import Main from './components/Main.components'
import Footer from './components/Footer.components'
import Metrics from './components/Metrics.components'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = ()=>{
  // current value of URL input
  const [curr, setCurr] = useState('')
  // flavor
  const [flavor, setFlavor] = useState('')
  // final shortened URL
  const [final, setFinal] = useState(null)
  
  const [validity, setValidity] = useState(0)

  const handleInputChange = (e)=>{
    setCurr(e.target.value)
  }
  const handleFlavorChange = (e)=>{
    let temp = e.target.value.trim()
    if(temp.length > 20)
      temp = temp.substring(0, 20)
    setFlavor(temp)
  }
  const postURL = async ()=>{
    setFinal('')
    const save = {"url": curr}
    if(flavor !== "")
      save['flavor'] = flavor
    
      console.log(save)
    const result = await axios.post('https://ctlnk.herokuapp.com', save)
                            .catch(err => console.log(err))
    if(result === undefined){
      return
    }
    if(result.data.errorId === 2 || result.data.errorId === 1){
      setFinal(result.data.error)
      setValidity(0)
    }
    else{
      setFinal(result.data.shortenedURL)
      setValidity(result.data.epoch)
    }
  }
  const copy = ()=>{
    navigator.clipboard.writeText(final)
    window.open(final, "_blank")
  }

  return (
    <div className="h-screen">
      <Navbar />
      <Router>
        <>
          <Switch>
            <Route path='/metrics'>
                <Metrics />
            </Route>
            <Route path='/'>
              <Main chandler={handleInputChange} flavorHandler = {handleFlavorChange}
                    post={postURL} final={final} copy={copy} flavor={flavor}
                      validity={validity}/>
            </Route>
          </Switch>
          </>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
