import '@/Styles/formLogin.css'

const Login = () => {
  return (
    <>
      <div className='login-container'>
        <div className='shared-background' />
        <div className='shared-overlay' />
        <form>
          <h2>Login</h2>
          <div className='form-group'>
            <label>Email:</label>
            <input type='email' name='email' required />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input type='password' name='password' required />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>

    </>
  )
}

export default Login
