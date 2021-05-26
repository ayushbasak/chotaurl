const Footer = ()=>{
    return (
        <footer className="bg-gray-500 p-0.5 flex flex-col justify-evenly items-center lg:flex-row">
            <span className="text-lg text-white m-6 lg:m-0">made with ♥ by  
                <a  className ="font-bold m-1 p-2 hover:bg-gray-800"  href ="https://github.com/ayushbasak/">@ayushbasak</a>
            </span>
            <span className="text-lg text-white m-6 lg:m-4">
                checkout on 
                <a className="m-1 p-2 hover:bg-gray-800 font-bold" href="https://github.com/ayushbasak/chotaurl">
                    github
                </a>
            </span>
        </footer>
    );
}

export default Footer;