import React, { useState, useEffect } from 'react'
import { getAllShowsServices } from '@/Services/tvShowsServices'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Home = () => {
  const [shows, setShows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedShow, setSelectedShow] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllShowsServices()
        if (response.status === 200) {
          setShows(response.data)
        }
      } catch (error) {
        console.log('Error:', error.message)
      }
    }
    fetchData()
  }, [])

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }

  const handleShowModal = show => {
    setSelectedShow(show)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setSelectedShow(null)
    setShowModal(false)
  }

  const filteredShows = shows.filter(show => {
    return show.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <>
      <div className='container'>
        <h1>TV Shows</h1>

        <form className='form-inline my-2 my-lg-0 w-75'>
          <input
            type='text'
            className='form-control'
            id='search'
            placeholder='Enter show name'
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>

        <div className='row'>
          {filteredShows.map(show => (
            <div className='col-sm-4 mb-4' key={show.id}>
              <div className='card'>
                <img
                  className='card-img-top'
                  src={show.image?.medium || 'placeholder-image-url'}
                  alt={show.name}
                  onClick={() => handleShowModal(show)}
                  style={{ cursor: 'pointer' }}
                />
                <div className='card-body'>
                  <h4 className='card-title'>{show.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }} >{selectedShow?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: selectedShow?.summary }} />
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home
