const PageHeader = ({ title, children }) => {
  return (
    <div className="w-full flex items-center px-4 h-[40px] border-b gap-4">
      <span>{title}</span>
      {children}
    </div>
  )
}

export default PageHeader
