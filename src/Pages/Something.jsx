import React from 'react'

const Something = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h2>Video of the month</h2>
        <video width='520' height='240' controls>
          <source
            src='https://www.w3schools.com/html/mov_bbb.mp4'
            type='video/mp4'
          />
          Tu navegador no soporta el elemento video.
        </video>
      </div>
    </div>
  )
}

export default Something
