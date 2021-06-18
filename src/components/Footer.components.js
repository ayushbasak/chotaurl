import  { Link} from 'react-router-dom'
const Footer = ()=>{
    return (
        <footer className="bg-gray-500 p-0.5 flex flex-col justify-evenly items-center lg:flex-row">
            <div className="flex flex-row m-5">
                <Link to='/metrics'>
                    <span className="m-6 p-2 hover:bg-gray-800 font-bold text-white rounded-lg">Metrics</span>
                </Link>
                <Link to='/'>
                    <span className="m-2 p-2 hover:bg-gray-800 font-bold text-white rounded-lg">Home</span>
                </Link>
                <Link to='/User'>
                <span className="m-2 p-2 hover:bg-gray-800 font-bold text-white rounded-lg">User</span>
                </Link>
            </div>
            <span className="text-lg text-white m-6 lg:m-0">made with ♥ by  
                <a  className ="font-bold m-1 p-2 hover:bg-gray-800 rounded-lg"  href ="https://github.com/ayushbasak/">@ayushbasak</a>
            </span>
            <span className="text-lg text-white m-6 lg:m-4">
                checkout on 
                <a className="m-1 p-2 hover:bg-gray-800 font-bold rounded-lg" href="https://github.com/ayushbasak/chotaurl">
                    github
                </a>
            </span>
        </footer>
    );
}

export default Footer;