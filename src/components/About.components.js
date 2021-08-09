const About = ()=>{
    return (
        <div className="w-full lg:w-5/12 md:w-7/12 bg-indigo-400 h-auto p-4 lg:m-3 py-10 rounded-lg shadow-xl text-white text-center">
            <h1 className="text-3xl my-2 p-2 border-2 rounded-xl">About</h1>
            <p className="text-xl">This app uses the <strong>ChotaURL-api</strong></p>
            <span className="m-2 p-2">ChotaURL-api is a rest api I created using ExpressJs, which uses PostgreSQL
                to map your URLS to shortened URLS
            </span>
            <p className="bg-pink-600 p-3 m-3 rounded-xl">You may need to wait a few of seconds
                before a URL is generated, this is because Heroku puts free dynos to sleep
                after a few hours.
            </p>

            <p className="flex flex-col">Build your own URL shortener application using the 
                <a className="m-3 px-2 py-5 font-bold text-2xl bg-indigo-500 hover:bg-indigo-600 rounded-xl" href="https://github.com/ayushbasak/chotaurl-api">ChotaURL-api</a>
            </p>
        </div>
    );
}
export default About