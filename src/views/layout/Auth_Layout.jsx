import { Outlet } from "react-router-dom"

export default function Auth_Layout() {
  return (
    <>
      <main className="bg-gradient-to-b from-[#1a1470] to-[#181bc2]">
        <Outlet />
      </main>
    </>

  )
}
