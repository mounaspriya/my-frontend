import React from 'react'
import WorkstreamCard from '../component/WorkstreamCard'
import '../styles/WorkstreamGrid.css'

const dummyWorkstreams = [
  { id: 1, title: 'Workstream 1', rows: 20, active: true },
  { id: 2, title: 'Workstream 2', rows: 20 },
  { id: 3, title: 'Workstream 3', rows: 20 },
]

const WorkstreamGrid = () => {
  return (
    <div className="workstream-grid">
      {dummyWorkstreams.map((ws) => (
        <WorkstreamCard key={ws.id} {...ws} />
      ))}
      <WorkstreamCard addNew />
    </div>
  )
}

export default WorkstreamGrid
