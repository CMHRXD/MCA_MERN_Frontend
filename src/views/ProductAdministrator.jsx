import React from 'react'
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
const ProductAdministrator = ({view}) => {

    return (
        <div className=''>
            {view=="form" ? <ProductForm /> : <ProductTable />}
        </div>
    )
}

export default ProductAdministrator;