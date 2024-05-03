import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative h-screen w-screen bg-slate-50">
      <aside className="absolute left-0 top-0 w-[200px] h-full">
        <Sidebar />
      </aside>
      <main className="w-[calc(100vw-200px)] h-full ml-[200px]">
        <div className="p-3 h-full w-full">
          <div className="rounded-lg border w-full h-full bg-white">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
