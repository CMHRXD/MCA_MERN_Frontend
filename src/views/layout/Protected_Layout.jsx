//Import tools
import { Navigate, Outlet } from "react-router-dom";
//Import Global Context
import useAuth from "../../hooks/useAuth";

//Import components
import Footer from "../../components/Footer";
import Header from "../../components/Header";


const Protected_Layout = () => {

  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex">
        <Header />
        <main className="container mx-auto mt-10">
          {auth._id ? <Outlet /> : <Navigate to="/" />}
        </main>
        {//<Footer />
        }
      </div>
    </>
  )
}

export default Protected_Layout;



