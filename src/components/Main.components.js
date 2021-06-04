import '../../public/copy.svg'
import  About from './About.components'
import Loading from './Loading.components'
import Validity from './Validity.components';
const Main = ({enabled, chandler, flavorHandler, post, final, copy, flavor, validity})=>{
    return (
        <div className="flex flex-col lg:flex-row jusitify-between items-evenly p-2 bg-white h-auto lg:h-4/6">
            <About />
            <div className="flex flex-col w-full justify-center items-center">
                <span className ="shadow bg-gray-800 text-white w-11/12 lg:w-5/12 py-4 m-2 text-center rounded border-l-8 border-red-400">Your URL</span>
                <input onChange = {chandler} className = "shadow-xl w-11/12 lg:w-5/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder = "Enter URL"></input>
                <input onChange = {flavorHandler} className = "shadow-xl w-11/12 lg:w-5/12 px-10 py-5 m-2 text-lg focus:outline-none rounded border-l-8 border-red-400" placeholder ="flavor string" value={flavor}></input>
                <button onClick = {post} className="shadow-xl bg-green-400 p-3 text-white w-11/12 lg:w-5/12 hover:bg-green-500 rounded border-l-8 border-red-400">Create</button>
                <span className=" shadow-xl bg-yellow-400 p-7 w-80 lg:w-5/12 text-center m-2 font-bold text-sm lg:text-xl text-white rounded flex flex-col lg:flex-row justify-center items-center lg:flex-shrink-0 border-l-8 border-red-400">
                    <span className="overflow-ellipsis">
                        {final === '' ?  <Loading />: (
                            final === null ? '' : final
                        )}
                    </span>
                    <img src="copy.svg" alt = "copy" className="mx-5 w-10 h-10 p-3 cursor-pointer hover:bg-yellow-300 rounded-xl" onClick={copy}></img>
                </span>
                {validity !== 0 ?
                    <Validity validity = {validity}/> : ''
                }
            </div>
        </div>
    );
}

export default Main;