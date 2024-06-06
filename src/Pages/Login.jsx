import '@/Styles/formLogin.css'

const Login = () => {
  return (
    <>
      <div className='container'>
        <form className='bg-white p-4 rounded shadow' style={{ width: '300px' }}>
          <div className='mb-3'>
            <img
              className='mb-4'
              src='./src/assets/s.png'
              width={70}
              height={70}
              alt='logo-stream'
              style={{ marginLeft: '93px' }}
            />
            <input type='email' name='email' className='form-control' placeholder='Email' required />
          </div>
          <div className='mb-3'>
            <input type='password' name='password' className='form-control' placeholder='Password' required />
          </div>
          <button type='submit' className='btn btn-info w-100'>Login</button>
        </form>
      </div>

    </>
  )
}

export default Login
