import axios from 'axios'
import { useState } from 'react'
import Validity from './Validity.components'
import CryptoJs from 'crypto-js'
import { API_URI } from '../config';
const Pastebin = ()=>{
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [passcode, setPasscode] = useState('')
    const [recievedCode, setRecievedCode] = useState(undefined)

    const [readbinLink, setReadbinLink] = useState('')
    const [readbinTitle, setReadbinTitle] = useState('Title')
    const [readbinContent, setReadbinContent] = useState('')
    const [readbinPasscode, setReadbinPasscode] = useState('')
    const [validity, setValidity] = useState(0)


    const handleTitle = (e)=>{
        const tempTitle = e.target.value.substr(0,200);
        setTitle(tempTitle)
    }

    const handlePasscode = (e)=>{
        const tempPasscode= e.target.value.substr(0,10);
        setPasscode(tempPasscode)
    }

    const handleContent = (e)=>{
        let tempContent = e.target.value;
        tempContent = tempContent.replace(/\n/g, '<br>')
        setContent(tempContent)
    }

    const submit = async ()=>{
        console.log('submitted');
        const { data } = await axios.post(API_URI + '/p/', {
            title: title,
            content: content,
            passcode: passcode
        })
        console.log(data);
        if(data.code !== undefined){
            console.log(data.code)
            setPasscode(data.passcode)
            setRecievedCode(data.code)
            setValidity(Number(data.epoch))
        }
    }

    const handleReadbinLink = (e)=>{
        setReadbinLink(e.target.value)
    }

    const handleReadbinPasscode = (e)=>{
        setReadbinPasscode(e.target.value)
    }

    const getPastebin = async ()=>{
        if(readbinLink.length > 0){
            let link = readbinLink;
            link = API_URI + '/p/' + link
            await axios.get(link)
                .then(response => {
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
        navigator.clipboard.writeText(recievedCode)
    }

    const downloadPastebin = ()=>{
        const newText = `${readbinTitle}\n\n${readbinContent}`;
        const blob = new Blob([newText], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chotaurl-pastebin-${readbinLink}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        // document.removeChild(a);
    }

    const decryptContent = () => {
        if(readbinPasscode !== ''){
            let tempContent = readbinContent;
            try{
                let bytes = CryptoJs.AES.decrypt(tempContent,readbinPasscode);
                tempContent = bytes.toString(CryptoJs.enc.Utf8);
                setReadbinContent(tempContent);
            }
            catch(e){
                console.log(e)
            }
        }
    }

    const createShareText = (e)=>{
        let shareText = `\nHey!\nI just created a pastebin for you!\nCode: ${recievedCode}`
        if(passcode === '')
            shareText += '\nNo Passcode required'
        else
            shareText += `\nPasscode: ${passcode}`
        
        shareText += `\nPaste it in Readbin: https://chotaurl.vercel.app/Pastebin`
        navigator.clipboard.writeText(shareText)
    }

    return (
        <>
        <div className="flex flex-col lg:flex-row jusitify-between items-evenly p-2 h-auto lg:h-screen">
            <div className="flex flex-col w-full justify-center items-center">
                <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Pastebin</span>
                <input onChange = { handleTitle  }  className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Title"></input>
                <input onChange = { handlePasscode }  className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Passcode [Optional]" maxLength="10" type="password"></input>
                <textarea onChange = { handleContent }className = "shadow-xl w-11/12 h-full lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Content"></textarea>
                <button onClick = { submit }  className="shadow-xl bg-green-500 p-3 text-white w-11/12 lg:w-8/12 hover:bg-green-600 rounded border-l-8 border-red-400">Create</button>
                {
                    recievedCode && 
                        <div className=" shadow-xl bg-indigo-400 p-7 w-80 lg:w-8/12 text-center m-2 font-bold text-sm lg:text-xl text-white rounded flex flex-col lg:flex-row justify-center items-center lg:flex-shrink-0 border-l-8 border-red-400">
                            <span className="p-1">
                                Share this code: 
                            </span>
                            <a href = { recievedCode } >
                                { recievedCode }
                            </a>
                            <img src="copy.svg" alt = "copy" className="mx-5 w-10 h-10 p-3 cursor-pointer hover:bg-yellow-300 rounded-xl" onClick={copy}></img>
                            <img src="share.svg" className="mx-5 w-10 h-10 p-3 cursor-pointer hover:bg-yellow-300 rounded-xl" alt="send" onClick={createShareText}/>
                        </div>
                }  
                {
                    validity !== 0?
                    <Validity validity = {validity}/> : ''
                }
            </div>
            <div className = "flex flex-col w-full justify-center items-center">
                <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Readbin</span>
                <input onChange = { handleReadbinLink } className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Pastebin link or code"></input>
                <button onClick = { getPastebin }  className="shadow-xl bg-green-500 p-3 text-white w-11/12 lg:w-8/12 hover:bg-green-600 rounded border-l-8 border-red-400" >Get Pastebin</button>
                <div className="flex flex-col lg:flex-row w-full justify-center items-center">
                    <input onChange = { handleReadbinPasscode } className = "shadow-lg w-11/12 lg:w-6/12 px-10 py-5 my-2 mx-1 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Passcode if any" type="password"></input>
                    <button onClick = { decryptContent } className="shadow-xl bg-green-500  py-5 text-white w-11/12 lg:w-2/12 hover:bg-green-600 rounded border-l-8 border-red-400">Decrypt</button>
                </div>
                <p className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400">{ readbinTitle }</p>
                <textarea className = "shadow-xl w-11/12 h-full lg:w-8/12 max-w-lg px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400 overflow-x-hidden" value = { readbinContent  } readOnly></textarea>
                {
                    readbinContent !== '' && readbinContent !== 'No such paste' &&
                    <button onClick = { downloadPastebin }  className="shadow-xl bg-indigo-400 p-3 text-white w-11/12 lg:w-8/12 hover:bg-purple-500 rounded border-l-8 border-red-400" >Download</button>
                }
            </div>
        </div>
        </>
    )
}
export default Pastebin;