import { useState, createContext, useEffect } from 'react';
import AxiosClient from '../config/axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [carrito, setCarrito] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        try {
            const { data } = await AxiosClient.get('/products', config);
            setProducts(data);
        } catch (error) {
            console.log(error.response.data.msg);
        }

        setCarrito(JSON.parse(localStorage.getItem('product_cart')) || []);

    }

    const saveProduct = async product => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        if (!product._id == "") {
            try {
                const { data } = await AxiosClient.put(`/products/${product._id}`, product, config);
                setProducts(products.map(product => product._id === data._id ? data : product));
                if(!product.cantToSell) swal("Producto Actualizado", "El producto se actualizó correctamente", "success");
                
            } catch (error) {
                console.log(error.response.data.msg);
            }
            return;
        } else {
            try {
                const { data } = await AxiosClient.post('/products', product, config);
                const { createdAt, updatedAt, __v, ...newProduct } = data;
                setProducts([newProduct, ...products]);
                swal("Producto Guardado", "El producto se ha guardado correctamente", "success");
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const editProduct = (id) => {
        products.forEach(product => {
            if (product._id === id) {
                setProduct(product);
            }
        })
    }

    const deleteProduct = async id => {
        const userToken = localStorage.getItem('aph_token');
        if (!userToken) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        const swalResponse = await swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podras recuperar este registro",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        });
        if (swalResponse) {
            try {
                await AxiosClient.delete(`/products/${id}`, config);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    //Cart View
    const addToCart =  (id) => {
        let tempCart = carrito;
        const data = getCartProduct(id); //search product
        const existentProduct = carrito.find(product => product._id === id); //search product in carrito

        if (existentProduct) { //if product exist in carrito increment quantity
            existentProduct.cantToSell += 1;
            tempCart = [...tempCart]  //update carrito      
        } else { //if product not exist in carrito add product to carrito
            data.cantToSell = 1;
            tempCart.push(data);
            if (data.cantToSell) {
                swal('Exito', 'Producto agregado al carrito', 'success');
            }
        }
        setCarrito(tempCart);
        localStorage.setItem('product_cart', JSON.stringify(tempCart));   //update localStorage
    }

    const getCartProduct = (id) => {
        const product = products.find(product => product._id === id);
        return product;
    }

    const checkStock = (id, cantToSell) => {
        const product = getCartProduct(id);
        if (product.stock - cantToSell < 0) {
            swal('Error', 'No hay suficiente stock', 'error');
            return false;
        }
        return true;
    }

    const updateStockSelled = (id, cantToSell) => {
        const product = getCartProduct(id);
        product.stock -= cantToSell;
        saveProduct(product);
        setProducts([...products]);
    }

    return (
        <ProductContext.Provider value={{ products,product, saveProduct, deleteProduct, editProduct,addToCart,updateStockSelled,checkStock, carrito, setCarrito,getProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;