import axios from 'axios'
import { useEffect , useState } from 'react'
const Metrics = ()=>{
    const [count, setCount] = useState(-1)
    const [hostNames, setHostNames] = useState([''])
    useEffect(()=>{
        axios.get('https://ctlnk.herokuapp.com/about')
            .then(response => {
                setCount(response.data.count)
                setHostNames(response.data.hostNames)
                return
            })


    }, [])
    // console.log(data)
    return (
        <>
        {
           count >= 0 ? 
            <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center">
                <p className="text-5xl bg-green-400 p-5 w-11/12 lg:w-5/12 rounded-xl text-white shadow-xl text-center">{count} entr{count === 1 ? 'y' : 'ies'}</p>
                <div className="overflow-auto h-4/6 w-full lg:w-4/12 p-2 bg-blue-800 text-center lg:rounded-xl shadow-xl">
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
            :
            <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center bg-green-100">
                <span className="p-5 m-3 bg-blue-400 text-white" id="loading">Loading</span>
            </div>
        }
        </>
    )
}
export default Metrics