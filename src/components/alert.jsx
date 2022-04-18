
export default function Alert({msg}) {

    return (
        <div className={`${msg.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} 
                        bg-gradient-to-br text-center p-3 rounded-xl uppercase font-bold text-white mb-10 text-sm message`}>
            { msg.msg}
        </div>
        
    )

}
