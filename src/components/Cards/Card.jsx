import React from 'react'
import './Card.css'

function Card({ cardTitle, cardContent, topRight, bottomRight, className }) {
  return (
    <div className={`pl-card card p-3 my-3 ${className}`}>
        <div className='d-flex align-items-center justify-content-between'>
            <div className='pl-card-cardTitle'>
                <b>{cardTitle}</b>
            </div>
            <div className='pl-card-topRight'>{topRight}</div>
        </div>

        <div className='d-flex align-items-center justify-content-between'>            
            <div className='pl-card-cardContent'>{cardContent}</div>
            <div className='pl-card-bottomRight'>{bottomRight}</div>
        </div>
    </div>
  )
}

export default Card