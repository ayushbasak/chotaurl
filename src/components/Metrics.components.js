import axios from 'axios'
import { useEffect , useState } from 'react'
import { API_URI } from '../config';
import MetricChart from './MetricChart';
const Metrics = ()=>{
    const [chotaURLcount, setChotaURLCount] = useState(-1)
    const [urlMetrics, setUrlMetrics] = useState([])
    const [flavor, setFlavor] = useState('')

    const [pastebinCount, setPastebinCount] = useState(-1)
    useEffect(()=>{
        axios.get(API_URI + '/about/q/')
            .then(response => {
                setChotaURLCount(response.data.count)
                return
            })
        axios.get(API_URI + '/about/p/')
            .then(response => {
                setPastebinCount(response.data.count)
                return
            })

    }, [])

    const flavorHandler = (e)=>{
        setFlavor(e.target.value)
    }

    const getMetrics = async ()=>{
        try {
            const { data } = await axios.get(API_URI + '/about/q/' + flavor)
            const dates = compileDateMetrics(data);
            setUrlMetrics(dates)
            console.log(dates);
        } catch (error) {
            console.log(error);
        }
    }

    // function to convert array of epoch times to date strings
    const compileDateMetrics = (data) => {
        let dates = [];
        data.forEach(curr => {
            let date = Number(curr.epoch);
            dates.push(date);
        });
        let buckets = {};
        dates.forEach(curr => {
            let curr_bucket = new Date(curr - (curr % 60000));
            if (buckets[curr_bucket] === undefined) {
                buckets[curr_bucket] = 1;
            }
            else {
                buckets[curr_bucket] += 1;
            }
        });
        let final = [];
        for (let key in buckets) {
            final.push({ date: key, count: buckets[key] });
        }
        return final;
    }
    // console.log(data)
    return (
        <>
        {
           (chotaURLcount >= 0 || pastebinCount >= 0) ? 
            <div className="flex flex-col lg:flex-row  justify-evenly items-center lg:h-4/6">
                <div className='flex flex-col justify-evenly items-center w-6/12'>
                    <div className="flex flex-col w-full justify-evenly items-center">
                        <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">ChotaURL</span>
                        <p className="text-5xl bg-green-400 p-5 m-2 w-11/12 lg:w-8/12 rounded-xl text-white shadow-xl text-center">{chotaURLcount} entr{chotaURLcount === 1 ? 'y' : 'ies'}</p>
                        {/* <div className= "h-48 lg:h-auto overflow-y-scroll m-1 w-11/12 lg:w-8/12 p-2 bg-green-800 text-center rounded-xl shadow-xl">
                            <span className="text-white text-2xl bg-yellow-600 p-4 rounded-xl flex flex-col justify-center items-center">{hostNames.length} domains</span>
                            {
                                
                                hostNames.map(curr =>
                                    <span className="flex flex-row flex flex-row justify-left items-center p-1">
                                        <img src={`https://${curr}/favicon.ico`} className="w-5 h-5 m-2 mx-5 bg-white-200" alt="N"/>
                                        <span className="text-white text-center select-none">{curr}</span>    
                                    </span>
                                )
                            }
                        </div> */}
                    </div>
                    <div className = "flex flex-col w-full justify-evenly items-center">
                        <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Pastebin</span>
                        <p className="text-5xl bg-green-400 p-5 m-2 w-11/12 lg:w-8/12 rounded-xl text-white shadow-xl text-center">{pastebinCount} entr{pastebinCount === 1 ? 'y' : 'ies'}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-evenly items-center w-6/12 h-full'>
                    <div className="flex flex-col w-full justify-evenly items-center h-5/6">
                        <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-8/12 py-4 m-2 text-center rounded border-l-8 border-red-400">URL Metrics</span>
                        <input onChange={flavorHandler} className = "shadow-xl w-11/12 lg:w-8/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Enter URL code / flavor"></input>
                        <button onClick={getMetrics} className="shadow-xl bg-green-500 p-3 text-white w-11/12 lg:w-8/12 hover:bg-green-600 rounded border-l-8 border-red-400">Get Metrics</button>
                        {/* <textarea className="shadow-xl w-11/12 lg:w-8/12 p-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400 h-full" placeholder = "Metrics will be displayed here" value={JSON.stringify(urlMetrics)}></textarea> */}
                        {
                            urlMetrics.length > 0 ?
                            <MetricChart data={urlMetrics}/>
                            :
                            <div className="flex flex-col justify-center items-center w-11/12 lg:w-8/12 p-3 bg-red-600 rounded-xl shadow-xl">
                                <p className="text-2xl text-white">No metrics available</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            :
            <div className="flex flex-col lg:flex-row h-4/6 justify-evenly items-center bg-indigo-100">
                <span className="p-5 m-3 bg-purple-400 text-white rounded-xl flex flex-row justify-center items-center" id="loading">
                    <img src="loading.png" alt="loading" className="animate-spin mx-5 w-10 h-10 p-3"></img>
                    Loading
                </span>
            </div>
        }
        </>
    )
}
export default Metrics