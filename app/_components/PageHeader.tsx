const PageHeader = ({ title, children }) => {
  return (
    <div className="w-full flex items-center px-4 h-[40px] border-b">
      <span>{title}</span>
      {children}
    </div>
  )
}

export default PageHeader
