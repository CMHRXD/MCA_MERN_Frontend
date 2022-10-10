import { Outlet } from "react-router-dom"

export default function Auth_Layout() {
  return (
    <>
      <main className="bg-sky-100 w-full h-full ">
        <Outlet />
      </main>
    </>

  )
}
