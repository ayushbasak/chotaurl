import axios from 'axios'
import { useEffect , useState } from 'react'
const Metrics = ()=>{
    const [chotaURLcount, setChotaURLCount] = useState(-1)
    const [hostNames, setHostNames] = useState([''])

    const [pastebinCount, setPastebinCount] = useState(-1)
    useEffect(()=>{
        axios.get('https://ctlnk.herokuapp.com/about/q/')
            .then(response => {
                setChotaURLCount(response.data.count)
                setHostNames(response.data.hostNames)
                return
            })
        axios.get('https://ctlnk.herokuapp.com/about/p/')
            .then(response => {
                setPastebinCount(response.data.count)
                return
            })

    }, [])
    // console.log(data)
    return (
        <>
        {
           (chotaURLcount >= 0 || pastebinCount >= 0) ? 
            <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center">
                <div className="flex flex-col w-full justify-evenly items-center">
                    <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">ChotaURL</span>
                        <p className="text-5xl bg-green-400 p-5 m-2 w-11/12 lg:w-8/12 rounded-xl text-white shadow-xl text-center">{chotaURLcount} entr{chotaURLcount === 1 ? 'y' : 'ies'}</p>
                        <div className="overflow-auto h-4/6 w-full lg:w-8/12 p-2 bg-blue-800 text-center lg:rounded-xl shadow-xl">
                            <span className="text-white text-2xl bg-red-400 p-4 rounded-xl flex flex-col justify-center items-center">{hostNames.length} domains</span>
                                {
                                    
                                    hostNames.map(curr =>
                                        <span className="flex flex-row flex flex-row justify-left items-center p-1">
                                            <img src={`https://${curr}/favicon.ico`} className="w-5 h-5 m-2 mx-5 bg-white-200" alt="N"/>
                                            <span className="text-white text-center select-none">{curr}</span>    
                                        </span>
                                    )
                                }
                        </div>
                </div>
                <div className = "flex flex-col w-full justify-evenly items-center">
                    <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Pastebin</span>
                    <p className="text-5xl bg-green-400 p-5 m-2 w-11/12 lg:w-8/12 rounded-xl text-white shadow-xl text-center">{pastebinCount} entr{pastebinCount === 1 ? 'y' : 'ies'}</p>
                </div>
            </div>
            :
            <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center bg-green-100">
                <span className="p-5 m-3 bg-blue-400 text-white" id="loading">Loading</span>
            </div>
        }
        </>
    )
}
export default Metrics