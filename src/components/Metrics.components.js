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
                <p className="text-5xl bg-green-400 p-3 rounded-xl text-white shadow-xl text-center">{count} <br></br>entries</p>
                <div className="overflow-auto h-4/6 w-full lg:w-4/12 p-2 bg-blue-800 text-center lg:rounded-xl shadow-xl">
                <span className="text-white text-2xl bg-red-400 p-4 rounded-xl">Domains</span>
                        {
                            
                            hostNames.map(curr =>
                                   <p className="text-white text-center select-none">{curr}</p>    
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