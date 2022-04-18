import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { useMemo } from 'react';
import usePacients from '../hooks/usePacients'
import { COLUMNS } from './colums';
import { GloablFilter } from './GloablFilter';

export const Table = () => {
    const { pacients, editPacient, deletePacient, dateFormat } = usePacients();

    const data = pacients
    //const data = useMemo(() => pacients, []);
    const columns = useMemo(() => COLUMNS, []);

    const tableInstance = useTable({
        columns,
        data,
    }, useGlobalFilter, useSortBy, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        //Filter elements
        state,
        setGlobalFilter,
        rows,
        prepareRow,
        //Pagination
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        pageOptions,
    } = tableInstance;

    const { globalFilter, pageIndex } = state;

    return (
        <>
            <div className='flex flex-col items-center md:ml-32 mb-2 md:mb-3 md:mt-0 mt-3'>
                <h1 className=' text-slate-700 text-lg uppercase font-bold mb-2'>Listado de Pacientes</h1>
                <GloablFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            </div>
            <div className=" container relative overflow-x-auto shadow-md sm:rounded-lg mx-0 md:mx-10 items-center">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 "
                    {...getTableProps()}
                >
                    <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th scope="col" className="px-6 py-3" {...column.getHeaderProps(column.getSortByToggleProps)}>
                                        {column.render('Header')}
                                        <span className=' font-bold text-lg'>{column.isSorted ? (column.isSortedDesc ? '-' : '+') : ''}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (cell.column.Header === 'Edicion') {
                                            return (
                                                <td key={cell.value}>
                                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => editPacient(cell.value)}>Editar</a><br />
                                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deletePacient(cell.value)}>Eliminar</a>
                                                </td>
                                            )
                                        }
                                        return (
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap" {...cell.getCellProps()}>
                                                {cell.column.id == "consult_date" ? dateFormat(cell.value) : cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}

                    </tbody>
                    {/*<tfoot>
                        {footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map(column => (
                                    <td className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700" {...column.getFooterProps()}>
                                        {column.render('Footer')} 
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>*/}
                </table>
                {/*Pagination*/}
                <div className="flex flex-row justify-between">
                    <div className='mt-5 ml-4'>
                        <span>Page <strong>{pageIndex+1} of {pageOptions.length}</strong></span>

                    </div>
                    <div className='buttons'>
                        <button className=" bg-white text-base text-salte-700 m-3 p-2 text-center hover:bg-gray-400"
                            onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'Anterior'}
                        </button>
                        <button className=" bg-slate-800 text-base text-white m-3 p-2  text-center hover:bg-slate-600"
                            onClick={() => nextPage()} disabled={!canNextPage}>
                            {'Siguinte'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}