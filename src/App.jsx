import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (expection) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      
    } catch (error) {
      setErrorMessage('Title or url missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
      
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application </h2>
    <form onSubmit= {handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )

  const logOutButton = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  


  

    
      if (user === null) {
        return (
          <div>
      <Notification message={errorMessage} />
          {loginForm()}
          </div>
        )
      }

      return (
        <div>
          <Notification message={errorMessage} />
          <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logOutButton}>
        log out
      </button>
          <div>
            <BlogForm createBlog={addBlog} />
          </div>
        <h2>All blogs</h2>
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </div>
      )
}

export default App