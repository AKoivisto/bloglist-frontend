import { useState } from 'react'

const BlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <div>
      <h2>Add blog</h2>

      <form onSubmit= {addBlog}>
        <div>
        title
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
            data_testid='title'
          />
        </div>
        <div>
        author
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
            data_testid='author'
          />
        </div>
        <div>
        url
          <input
            type="url"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
            data_testid='url'
          />
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  )}

export default BlogForm