const Footer = ()=>{
    return (
        <footer className="bg-gray-500 p-4 flex flex-col justify-evenly items-center lg:flex-row">
            <span className="text-xl text-white s4">made with ♥ by  
                <a  className ="font-bold m-2 p-2 hover:bg-gray-800"  href ="https://github.com/ayushbasak/">@ayushbasak</a>
            </span>
            <span className="text-xl text-white m-4">
                checkout on 
                <a className="m-2 p-2 hover:bg-gray-800 font-bold" href="https://www.github.io/ayushbasak/chotaurl.git">github</a>
            </span>
        </footer>
    );
}

export default Footer;