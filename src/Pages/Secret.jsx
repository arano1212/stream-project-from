import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '@/Services/useServices'
import { useAuthContext } from '@/Hooks/useAuth'
import { Modal, Button, Form } from 'react-bootstrap'

const Secret = () => {
  const { token } = useAuthContext()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(token)
        const basicUsers = response.data.filter(user => user.role === 'basic')
        setUsers(basicUsers)
        console.log('Fetched users:', response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [token])

  const handleViewInfo = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id, token)
      setUsers(users.filter(user => user._id !== selectedUser._id))
      setShowModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div>
      <h1>Information Users</h1>
      <div className='row'>
        {users.map(user => (
          <div key={user._id} className='col-md-4'>
            <div className='card mb-4'>
              <img src={user.avatar} className='card-img-top' alt={`${user.username}'s avatar`} />
              <div className='card-body'>
                <h5 className='card-title'>{user.username}</h5>
                <p className='card-text'>{user.email}</p>
                <Button variant='primary' onClick={() => handleViewInfo(user)}>Información</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label style={{ color: 'black' }}><strong>Email:</strong></Form.Label>
                <Form.Control
                  type='email'
                  value={selectedUser.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'black' }}><strong>Username:</strong></Form.Label>
                <Form.Control
                  type='text'
                  value={selectedUser.username}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: 'black' }}><strong>Avatar:</strong></Form.Label>
                <br />
                {selectedUser.avatar && (
                  <img src={selectedUser.avatar} alt={`${selectedUser.username}'s avatar`} style={{ width: '100%' }} />
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
            <Button variant='danger' onClick={handleDeleteUser}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default Secret
