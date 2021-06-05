const Validity = ({ validity })=>{
    return (
        <p className="p-2 bg-green-400 w-full lg:w-5/12 text-center text-white rounded-lg shadow-xl border-l-8 border-red-400">
            Valid till {new Date(validity + 7 * 86400 * 1000).toUTCString()}
        </p>
    )
}
export default Validity