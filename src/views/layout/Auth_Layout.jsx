import { Outlet } from "react-router-dom"
import AnimatedWaves from "../../components/AnimatedWaves"

export default function Auth_Layout() {
  return (
    <>
      <main className="background-gardient w-full h-full ">
        <Outlet />
        <AnimatedWaves/>
      </main>
    </>

  )
}
