import React from 'react'

/** Başka bir sayfaya yönlendirme yapan buton.
 * @param {string} text Buton içerisindeki metin 
 * @param {string} url Yönlendirilecek url adresi
 */
function RouterButton({ text, url }) {
  return (
    <a href={url ?? '#'} className='btn btn-outline-secondary'>{text}</a>
  )
}

export default RouterButton