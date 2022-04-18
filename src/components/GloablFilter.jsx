
export const GloablFilter = ({filter, setFilter}) => {
    return(
                <input type="text" placeholder="Buscar Paciente" name="filter" id="filter" className="p-2 px-10 text-center text-slate-700 font-semibold mb-2 border rounded-md" value={filter || ''} onChange= {e => setFilter(e.target.value)} />

    )
}