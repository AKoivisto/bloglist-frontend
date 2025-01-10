import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
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
    <div style={{...hideWhenVisible, ...blogstyle}}>
    {blog.title} {blog.author}
    <button style={{marginLeft: '5px'}} onClick={() => handleShowDetails(true)}>view</button>
    </div>
    <div style={{...showWhenVisible, ...blogstyle}}>
    {blog.title} {blog.author}
    <button style={{marginLeft: '5px'}} onClick={() => handleShowDetails(false)}>hide</button>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button style={{marginLeft: '5px'}} onClick={() => updateLikes(blog)}>like</button>
      </div>
      {blog.user.name}
    </div>
    
  </div>  

  
)
}

export default Blog