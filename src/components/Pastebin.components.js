import axios from 'axios'
import { useState } from 'react'
import Validity from './Validity.components'
const Pastebin = ()=>{
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [recievedURL, setRecievedURL] = useState(undefined)

    const [readbinLink, setReadbinLink] = useState('')
    const [readbinTitle, setReadbinTitle] = useState('Title')
    const [readbinContent, setReadbinContent] = useState('')
    const [validity, setValidity] = useState(0)


    const handleTitle = (e)=>{
        const tempTitle = e.target.value.substr(0,20);
        setTitle(tempTitle)
    }
    const handleContent = (e)=>{
        let tempContent = e.target.value;
        tempContent = tempContent.replace(/\n/g, '<br>')
        setContent(tempContent)
    }

    const submit = async ()=>{
        const { data } = await axios.post('https://ctlnk.herokuapp.com/p/', {
            title: title,
            content: content
        })
        if(data.url !== undefined){
            setRecievedURL(data.url.split('https://ctlnk.herokuapp.com/p/')[1])
            setValidity(Number(data.epoch))
        }
        console.log(data)
    }

    const handleReadbinLink = (e)=>{
        setReadbinLink(e.target.value)
    }

    const getPastebin = async ()=>{
        if(readbinLink.length > 0){
            let link = readbinLink;
            link = 'https://ctlnk.herokuapp.com/p/' + link
            console.log(link)
            await axios.get(link)
                .then(response => {
                    console.log(response.data)
                    if(response.data.errorId === 2){
                        setReadbinTitle('TITLE')
                        setReadbinContent('No such paste')
                    }
                    else{
                        const temp = response.data.content.split("<br>").join("\n")
                        setReadbinTitle(response.data.title)
                        setReadbinContent(temp)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const copy = ()=>{
        navigator.clipboard.writeText(recievedURL)
    }

    return (
        <>
        <div className="flex flex-col lg:flex-row jusitify-between items-evenly p-2 h-auto lg:h-screen">
            <div className="flex flex-col w-full justify-center items-center">
                <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Pastebin</span>
                <input onChange = { handleTitle  }  className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Title"></input>
                <textarea onChange = { handleContent }className = "shadow-xl w-11/12 h-full lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Content"></textarea>
                <button onClick = { submit }  className="shadow-xl bg-green-400 p-3 text-white w-11/12 lg:w-8/12 hover:bg-green-500 rounded border-l-8 border-red-400">Create</button>
                {
                    recievedURL && 
                        <p className=" shadow-xl bg-yellow-400 p-7 w-80 lg:w-8/12 text-center m-2 font-bold text-sm lg:text-xl text-white rounded flex flex-col lg:flex-row justify-center items-center lg:flex-shrink-0 border-l-8 border-red-400">
                            <span className="p-3">
                                Share this code: 
                            </span>
                            <a href = { recievedURL } >
                                { recievedURL }
                            </a>
                            <img src="copy.svg" alt = "copy" className="mx-5 w-10 h-10 p-3 cursor-pointer hover:bg-yellow-300 rounded-xl" onClick={copy}></img>
                        </p>
                }  
                {
                    validity !== 0?
                    <Validity validity = {validity}/> : ''
                }
            </div>
            <div className = "flex flex-col w-full justify-center items-center">
                <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Readbin</span>
                <input onChange = { handleReadbinLink } className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Pastebin link or code"></input>
                <button onClick = { getPastebin }  className="shadow-xl bg-green-400 p-3 text-white w-11/12 lg:w-8/12 hover:bg-green-500 rounded border-l-8 border-red-400" >Get Pastebin</button>
                <p className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400">{ readbinTitle }</p>
                <textarea className = "shadow-xl w-11/12 h-full lg:w-8/12 max-w-lg px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400 overflow-x-hidden" value = { readbinContent  } readOnly></textarea>
            </div>
        </div>
        </>
    )
}
export default Pastebin;