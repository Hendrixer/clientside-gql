'use client'

import { cn } from '@nextui-org/react'

const getStatusClass = (status: string) => {
  return status === 'BACKLOG'
    ? 'border-slate-400 hover:border-slate-600'
    : status === 'INPROGRESS'
    ? 'border-yellow-300 border-yellow-500'
    : ''
}

const StatusRing = ({ status }) => {
  const statusClass = getStatusClass(status)

  return status === 'DONE' ? (
    <div className="w-4 h-4 rounded-full relative">
      <div className="w-2 h-2 bg-green-400 rounded-full absolute top-1 left-1"></div>
      <div className="w-4 h-4 rounded-full border-2 border-green-400 absolute top-0 left-0"></div>
    </div>
  ) : (
    <div
      className={cn(
        'w-4 h-4 rounded-full cursor-pointer border-3',
        statusClass
      )}
    ></div>
  )
}

export default StatusRing
