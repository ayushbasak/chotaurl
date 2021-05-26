import '../res/favicon-sub.png'
const Navbar = ()=>{
    return (
        <nav className="shadow-xl bg-gray-800 text-white px-10 py-6 flex justify-center flex-col items-center z-10">
            <span className ="text-3xl font-bold m-2 border-2 p-2 rounded-lg flex flex-row justify-center items-center">
                <img src="favicon-sub.png" alt="favicon" className="w-12 h-12 m-3"></img>
                ChotaURL
                </span>
            <span className = "text-lg">URL shortener / obfuscater </span>
        </nav>
    );
}

export default Navbar;