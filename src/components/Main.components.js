import '../../public/copy.svg'
const Main = ({chandler, post, final, copy})=>{
    return (
        <div className="flex flex-col jusityf-center items-center p-2 bg-red-100 h-4/6">
            <span className =" bg-gray-800 text-white w-11/12 lg:w-5/12 py-4 m-2 text-center rounded">Your URL</span>
            <input onChange = {chandler} className = "w-11/12 lg:w-5/12 px-10 py-5 m-2 text-lg focus:outline-none rounded" placeholder = "Enter URL"></input>
            <button onClick = {post} className="bg-green-400 p-3 text-white w-11/12 lg:w-5/12 hover:bg-green-500 rounded">Create</button>
            <span className="bg-yellow-400 p-7 w-80 lg:w-5/12 text-center m-2 font-bold text-sm lg:text-xl text-white rounded flex flex-row justify-center items-center lg:flex-shrink-0">
                {final}
                <img src="copy.svg" alt = "copy" className="mx-5 w-10 h-10 p-1 cursor-pointer hover:bg-yellow-600 rounded-xl" onClick={copy}></img>
            </span>
        </div>
    );
}

export default Main;