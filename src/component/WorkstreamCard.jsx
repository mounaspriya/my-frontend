import React from 'react'
import '../styles/WorkstreamCard.css'

const WorkstreamCard = ({ title, rows, active, addNew }) => {
  if (addNew) {
    return (
      <div className="card add-new">
        <span>＋</span>
        <p>Add Workstream</p>
      </div>
    )
  }

  return (
    <div className={`card ${active ? 'active' : ''}`}>
      <span className="icon">⏱️</span>
      <h4>{title}</h4>
      <p>{rows} Rows</p>
    </div>
  )
}

export default WorkstreamCard
