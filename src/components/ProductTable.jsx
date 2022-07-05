import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import { useMemo, useState } from 'react';
import { GloablFilter } from './GloablFilter';
import { useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

const ProductTable = () => {

    const { products, deleteProduct, editProduct, addToCart } = useProducts();

    const navigate = useNavigate();

    const COLUMNS = [
        {
            Header: 'Producto',
            Footer: 'Producto',
            accessor: 'name',
        },
        {
            Header: 'Stock',
            Footer: 'Stock',
            accessor: 'stock',
        },
        {
            Header: 'Precio',
            Footer: 'Precio',
            accessor: 'price',
        },
        {
            Header: 'Edicion',
            Footer: 'Edicion',
            accessor: '_id',
        },
    ]

    const data = products;
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
            <div className='container '>
                <div className='flex flex-col items-center w-auto'>
                    <h1 className='m-5 text-xl font-bold uppercase'>Listado de Productos</h1>
                    <GloablFilter filter={globalFilter} setFilter={setGlobalFilter} text="Buscar Productos" />
                </div>

                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 "
                        {...getTableProps()}
                    >
                        <thead className="text-xs text-white uppercase text-left bg-[#192485]">
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
                        <tbody {...getTableBodyProps} className="text-left">
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr className="bg-[#130e5f] hover:bg-[]" {...row.getRowProps()}>
                                        {row.cells.map(cell => {

                                            if (cell.column.Header === 'Edicion') {
                                                return (
                                                    <td key={cell.value}>
                                                        <a href="#" className="font-medium text-blue-500 hover:underline ml-5" onClick={() => { addToCart(cell.value) }}>Agregar</a><br />
                                                        <a href="#" className="font-medium text-green-500 hover:underline ml-5" onClick={() => { editProduct(cell.value); navigate("/admin/products-form") }}>Editar</a><br />
                                                        <a href="#" className="font-medium text-red-500  hover:underline ml-5" onClick={() => deleteProduct(cell.value)}>Eliminar</a>
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
                            <span>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>

                        </div>
                        <div className='buttons'>
                            <button className=" bg-white text-base text-salte-700 m-3 p-2 text-center hover:bg-gray-400"
                                onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'Anterior'}
                            </button>
                            <button className=" bg-blue-900 text-base text-white m-3 p-2  text-center hover:bg-blue-800"
                                onClick={() => nextPage()} disabled={!canNextPage}>
                                {'Siguiente'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductTable;