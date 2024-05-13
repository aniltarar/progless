import React from 'react'
import './Card.css'

/**
 * 
 * @param {{cardTitle, cardContent, topRight, bottomRight, className, _onClick, cardStyle:React.CSSProperties | undefined, children}} param0 
 * @returns 
 */
function Card({ cardTitle, cardContent, topRight, bottomRight, className, _onClick, cardStyle, children }) {
  return (
    <div style={cardStyle ?? {}} className={`pl-card card p-3 my-3 ${className}`} onClick={_onClick != null ? _onClick : () => {}}>
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

        {children}
    </div>
  )
}

export default Card