import  { Link } from 'react-router-dom'
const Footer = ()=>{
    return (
        <footer className="bg-indigo-500 p-0.5 flex flex-col justify-evenly items-center lg:flex-row">
            <div className="flex flex-row m-5">
                <Link to='/metrics'>
                    <span className="m-2 p-2 bg-purple-800 hover:bg-gray-800 font-bold text-white rounded-sm">Metrics</span>
                </Link>
                <Link to='/'>
                    <span className="m-2 p-2 bg-purple-800 hover:bg-gray-800 font-bold text-white rounded">ChotaURL</span>
                </Link>
                <Link to='/Pastebin'>
                    <span className="m-2 p-2 bg-purple-800 hover:bg-gray-800 font-bold text-white rounded">Pastebin</span>
                </Link>
                
            </div>
            <span className="text-lg text-white m-1 lg:m-0">made with ♥ by  
                <a  className ="font-bold m-1 p-2 hover:bg-gray-800 rounded"  href ="https://github.com/ayushbasak/">@ayushbasak</a>
            </span>
            <span className="text-lg text-white m-1 lg:m-4">
                checkout on 
                <a className="m-1 p-2 hover:bg-gray-800 font-bold rounded" href="https://github.com/ayushbasak/chotaurl">
                    github
                </a>
            </span>
        </footer>
    );
}

export default Footer;