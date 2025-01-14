import PropTypes from 'prop-types'

const LoginForm = (props) => {

  return (
    <div>
      <form onSubmit= {props.handleSubmit}>
        <div>
            username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
            data-testid='username'
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
            data-testid='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm