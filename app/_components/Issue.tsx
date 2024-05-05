import Status from './Status'

const Issue = ({ issue }) => {
  const displayId = issue.id.split('-').pop().slice(-3)

  return (
    <div className="px-4 h-[40px] border-b flex items-center hover:bg-slate-50 gap-4">
      <span className="text-sm text-slate-300 w-[80px]">
        {`PAR-${displayId}`.toUpperCase()}
      </span>
      <Status status={issue.status} issueId={issue.id} />
      <span>{issue.name}</span>
    </div>
  )
}

export default Issue
