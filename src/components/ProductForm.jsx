import { useEffect, useState } from 'react';
import useProducts from '../hooks/useProducts';

const ProductForm = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: '',
    price: '',

  });

  const { product, saveProduct } = useProducts();


  useEffect(() => {
    if (product?.name) {
      setNewProduct(product);
    }
  }, [product]);

  const handleSubmit = e => {
    e.preventDefault();
    //Check empty fields
    if (newProduct.name === '' || newProduct.price === '' || newProduct.stock === '') {
      swal("Error", "Todos los campos son obligatorios", "error");
      return;
    }
    saveProduct(newProduct);
    //Form Reset
    setNewProduct({ name: '', stock: '', price: '' });
  }

  return (
    <>
      <form className='flex justify-center items-center mt-5 md:mt-32'>
        <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>
          <h1 className='text-xl font-bold text-center text-white mb-10 border-b-2 p-3 border-blue-500'>Formulario de Productos</h1>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <input type="text" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre del Producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <input type="number" maxLength={30} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="price" name="price" placeholder="Precio del Producto"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <input type="number" maxLength={10} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="stock" name="stock" placeholder="Stock del Producto"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}
            />
          </div>

          <input type="submit" value={!newProduct._id ? "Agregar Producto" : "Guardar Cambios"}
            className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
            onClick={handleSubmit} />

        </div >
      </form>
    </>

  )
}

export default ProductForm