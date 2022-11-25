const BaseFooter = () => {
    return (
        <footer className="text-sm bg-indigo-500 p-0.5 flex flex-col justify-evenly items-center lg:flex-row w-full fixed bottom-0">
            <span className="text-sm text-white m-4 lg:m-0">made with ♥ by  
                <a  className ="font-bold bg-purple-400 m-1 p-2 hover:bg-gray-800 rounded"  href ="https://github.com/ayushbasak/">@ayushbasak</a>
            </span>
            <span className="text-sm text-white m-4 lg:m-4">
                checkout on 
                <a className="m-1 p-2 bg-purple-400 hover:bg-gray-800 font-bold rounded" href="https://github.com/ayushbasak/chotaurl">
                    github
                </a>
            </span>
            <span className="text-sm text-white m-4 lg:m-4">
                report bugs here: <a className="m-1 p-2 bg-purple-400 hover:bg-gray-800 font-bold rounded" href="https://github.com/ayushbasak/chotaurl/issues" target="_blank" rel="noreferrer">@github_issues</a>
            </span>
        </footer>
    );
}
export default BaseFooter;