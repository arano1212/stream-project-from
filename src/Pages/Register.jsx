import React from 'react'
import '@/Styles/register.css'

const Register = () => {
  return (
    <>
      <div className='register-container'>
        <div className='shared-background' />
        <div className='shared-overlay' />
        <form>
          <h2>Register</h2>
          <div className='form-group'>
            <label>Email:</label>
            <input type='email' name='email' required />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input type='password' name='password' required />
          </div>
          <div className='form-group'>
            <label>Username:</label>
            <input type='text' name='username' required />
          </div>
          <div className='form-group'>
            <label>Avatar URL:</label>
            <input type='text' name='avatar' />
            <label htmlFor='formFile' className='form-label mt-4'>Upload Avatar</label>
            <input className='form-control' type='file' id='formFile' name='avatar' />
          </div>
          <div className='form-group'>
            <label>Role:</label>
            <select name='role' required>
              <option value='basic'>Basic</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <button type='submit'>Register</button>

        </form>
      </div>
    </>
  )
}

export default Register
