import { useEffect, useState } from 'react';
import usePacients from '../hooks/usePacients';
import useConsult from '../hooks/useConsult';
import useProducts from '../hooks/useProducts';
import useServices from '../hooks/useServices';
import { Link } from 'react-router-dom';

const ConsultForm = () => {
  const [consult, setConsult] = useState({
    c_i: '',
    name: '',
    products: [],
    services: [],
    symptoms: 'Algun Sintoma',
    treatment: 'Algun Tratamiento',
    total: 0,
    date: new Date(),
  });



  let totalP = 0;
  let TotalS = 0;

  const { pacients, savePacient } = usePacients();
  const { saveConsult, oneConsult, detailView } = useConsult();
  const { updateStockSelled, checkStock, carrito, setCarrito, products } = useProducts();
  const { setServiceCart, serviceCart, services } = useServices();


  useEffect(() => {
    if (oneConsult._id) {
      setConsult({
        _id: oneConsult._id,
        c_i: oneConsult.c_i,
        name: oneConsult.pacient,
        symptoms: oneConsult.symptoms,
        treatment: oneConsult.treatment,
        total: oneConsult.total,
        date: oneConsult.date,
      });

      setCarrito(oneConsult.products.map(product => {
        const newProduct = products.find(p => p._id === product._id);
        newProduct.cantToSell = product.cantToSell;
        newProduct.cantSelled = product.cantToSell;
        return newProduct;
      }));

      setServiceCart(oneConsult.services.map(service => {

        return services.find(s => s._id === service);

      }));
    }
  }, [oneConsult]);


  //GUARDAR LOS DATOS
  const handleSubmit = async e => {
    e.preventDefault();
    //Check empty fields

    if (consult.c_i === '' || consult.name === '' || consult.symptoms === '' || consult.treatment === '') {
      swal('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }
    //Check if pacient exists
    const pacient = pacients.find(pacient => pacient.c_i === consult.c_i);
    if (!pacient) {
      const swalResponse = await swal({
        title: "El paciente no existe",
        text: "QUIERE AGREGARLO?",
        icon: "warning",
        buttons: ["Agregar", "Cancelar"],
        dangerMode: true,
      });
      if (!swalResponse) {
        savePacient({ c_i: consult.c_i, name: consult.name, phone: "1111111111" });
        return;
      }
    }
    //iF PACIENT EXISTS
    consult.name = pacient.name;
    consult.pacient = pacient._id;

    //Add total price of products and services
    consult.total = totalP + TotalS;

    //Update Product stock selled and Return Products Ids
    if (oneConsult._id) { 
      consult.products = carrito.map(product => {
        let newCant = 0;

        if(product.cantToSell > product.cantSelled){
          newCant = product.cantToSell - product.cantSelled;
        }else{
          newCant = (product.cantSelled - product.cantToSell) *-1;
        }

        //console.log(newCant);

        updateStockSelled(product._id, newCant);
        return { _id: product._id, cantToSell: product.cantToSell };
      });

     // console.log(consult.products);
    }
    else {
      consult.products = carrito.map(product => {
        updateStockSelled(product._id, product.cantToSell);
        return { _id: product._id, cantToSell: product.cantToSell };
      });
    }

    //Return Services Ids
    consult.services = serviceCart.map(service => service._id);

    //Check Output
    //console.log(consult);

    //Save consult
    saveConsult(consult);
    //Clear fields and LocalStorage
    setConsult({ c_i: '', name: '', products: [], services: [], symptoms: 'Algun Sintoma', treatment: 'Algun Tratamiento', total: 0, });
    localStorage.removeItem('product_cart');
    localStorage.removeItem('services_cart');
    setCarrito([]);
    setServiceCart([]);
  }

  const setCantidad = (id, cant) => {
    if (cant <= 0) return swal('Error', 'La cantidad debe ser mayor a 0', 'error');

    const newCarrito = carrito.map(product => {
      if (product._id === id) {
        if (checkStock(id, cant)) product.cantToSell = Number(cant);

      }
      return product;
    });
    localStorage.setItem('product_cart', JSON.stringify(newCarrito));
    setCarrito(newCarrito);

  }

  return (
    <div>
      <form className='flex justify-center items-center mt-5'>
        <div className='bg-gradient-to-t from-[#130e5f] to-[#210c7e] shadow-lg p-5 w-[800px] rounded-lg'>
          <h1 className='text-xl font-bold text-center text-white mb-8 border-b-2 p-3 border-blue-500'>{detailView ? "Detalle de Consulta" : "Formulario de Consultas"}</h1>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <input type="number" maxLength={12} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="c_i" name="c_i" placeholder="Cedula del Paciente"
              value={consult.c_i}
              onChange={(e) => setConsult({ ...consult, [e.target.name]: e.target.value })}
            />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <input type="text" maxLength={40} className='bg-transparent text-yellow-50 focus:outline-none w-full p-2 text-lg' id="name" name="name" placeholder="Nombre del Paciente"
              value={consult.name}
              onChange={(e) => setConsult({ ...consult, [e.target.name]: e.target.value })}
            />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400 text-white'>
            <table className='w-[550px] mb-5'>
              <thead className="text-xs text-white uppercase text-center border">
                <tr>
                  <th className='text-center  '>Producto</th>
                  <th className='text-center  '>Cantidad</th>
                  <th className='text-center  '>Precio</th>
                  <th className='text-center  '>Total</th>
                </tr>
              </thead>
              <tbody className='border'>
                {carrito.map((product, index) => {
                  totalP = totalP + product.price * product.cantToSell;

                  return (

                    <tr key={index} className="border">
                      <td className='text-center'>{product.name}</td>
                      <td className='text-center'>
                        <input type="number" value={product.cantToSell}
                          className="w-10 bg-transparent border-gray-300 rounded-lg text-center border-2"
                          readOnly={detailView}
                          onChange={e => setCantidad(product._id, e.target.value)}
                        />
                      </td>
                      <td className='text-center'>{product.price}</td>
                      <td className='text-center'>{product.price * product.cantToSell}</td>
                    </tr>
                  )
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td className='text-center' colSpan={3}></td>
                  <td className='text-center border-b'>Total General: {totalP} Gs</td>
                </tr>

              </tfoot>

            </table>

          </div>

          <div className='mb-5 border-b-2 flex border-blue-400 text-white'>
            <table className='w-[550px] mb-5'>
              <thead className="text-xs text-white uppercase text-center border">
                <tr>
                  <th className='text-center  '>Servicio</th>
                  <th className='text-center  '>Cantidad</th>
                  <th className='text-center  '>Precio</th>
                  <th className='text-center  '>Total</th>
                </tr>
              </thead>
              <tbody className='border'>
                {serviceCart.map((service, index) => {
                  TotalS = TotalS + service.price * 1;

                  return (

                    <tr key={index} className="border">
                      <td className='text-center'>{service.name}</td>
                      <td className='text-center'>1</td>
                      <td className='text-center'>{service.price}</td>
                      <td className='text-center'>{service.price * 1}</td>
                    </tr>
                  )
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td className='text-center' colSpan={3}></td>
                  <td className='text-center border-b'>Total General: {TotalS} Gs</td>
                </tr>

              </tfoot>

            </table>
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <textarea className='bg-transparent text-yellow-50 focus:outline-none w-full mt-3 p-2 text-lg' id="symptoms" name="symptoms" placeholder="Sintomas"
              value={consult.symptoms}
              onChange={(e) => setConsult({ ...consult, [e.target.name]: e.target.value })}
            />
          </div>

          <div className='mb-5 border-b-2 flex border-blue-400'>
            <textarea className='bg-transparent text-yellow-50 focus:outline-none w-full mt-3 p-2 text-lg' id="treatment" name="treatment" placeholder="Tratamiento"
              value={consult.treatment}
              onChange={(e) => setConsult({ ...consult, [e.target.name]: e.target.value })}
            />
          </div>
          {detailView 
            ? <Link to={"/admin/consults-table"}><input type="button" value={"Atras"}
            className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
            /></Link> 
            
            :<input type="submit" value={!oneConsult._id ? "Agregar Consulta" : "Guardar Cambios"}
            className=' bg-transparent border-2 rounded-lg w-full hover:bg-blue-900 cursor-pointer transition-colors checked: p-3 mt-5 uppercase text-white'
            onClick={handleSubmit} />}

        </div>
      </form>
    </div>
  )
}

export default ConsultForm;