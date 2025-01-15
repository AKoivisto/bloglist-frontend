import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [showDetails, handleShowDetails] = useState(false)

  const hideWhenVisible = { display: showDetails ? 'none' : '' }
  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const blogstyle = {
    border: 'solid',
    borderwidth: 1,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 3,
  }

  return (
    <div>
      <div className="blog" style={blogstyle}>
        {! showDetails ? (
          <div>
            {blog.title} {blog.author}
            <button style={{ marginLeft: '5px' }} onClick={() => handleShowDetails(true)}>view</button>
          </div>
        ) : (
          <div>
            {blog.title} {blog.author}
            <button style={{ marginLeft: '5px' }} onClick={() => handleShowDetails(false)}>hide</button>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button style={{ marginLeft: '5px' }} onClick={() => updateLikes(blog)}>like</button>
            </div>
            {blog.user.name}
            {blog.user.username === user.username && (
              <div>
                <button style={{ marginLeft: '5px' }} onClick={() => deleteBlog(blog)}>delete blog</button>
              </div>
            )}
          </div>

        )}
      </div>
    </div>
  )
}

export default Blog