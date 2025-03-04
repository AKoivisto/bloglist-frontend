import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import LoginForm from './components/Loginform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
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
      setCreateVisible(false)
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

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const updateLikes = async (blog) => {
    const toUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user.id,
    }
    try {
      const returnedBlog = await blogService.update(blog.id, toUpdate)
      setBlogs(sortBlogs(blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog))))
    } catch (error) {
      setErrorMessage('Error in updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)}
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
      try {
        await blogService.remove(blog.id)
        setBlogs(sortBlogs(blogs.filter((b) => b.id !== blog.id)))
        setErrorMessage(`Deleted blog ${blog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } catch {
        setErrorMessage('Deleting blog is not possible')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)}
    }
  }

  const loginForm = () => {
    // const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <h2>Log in to application </h2>
        <div>
        </div>
        <div>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <h2>Create new blog</h2>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

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
      {blogForm()}
      <h2>All blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateLikes={updateLikes} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App