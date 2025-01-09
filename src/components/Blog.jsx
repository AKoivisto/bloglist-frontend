import { useState } from "react"

const Blog = ({ blog }) => {
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

  const likeBlog = () => {
    console.log("blog liked")
  }

  return (
  <div>
    <div style={{...hideWhenVisible, ...blogstyle}}>
    {blog.title} {blog.author}
    <button style={{marginLeft: '5px'}} onClick={() => handleShowDetails(true)}>view</button>
    </div>
    <div style={{...showWhenVisible, ...blogstyle}}>
    {blog.title} {blog.author}
    <button style={{marginLeft: '5px'}} onClick={() => handleShowDetails(false)}>cancel</button>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button style={{marginLeft: '5px'}} onClick={() => likeBlog()}>like</button>
      </div>
      {blog.user.name}
    </div>
    
  </div>  

  
)
}

export default Blog