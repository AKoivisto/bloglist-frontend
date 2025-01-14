import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './Blogform'

test('calling event handler with right details when creating blog', async () => {
  const mockAddBlog = vi.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: 'new test blog',
    author: 'New Tester',
    url: 'https://newblogs.com/tests'
  }

  const  { container } = render(<BlogForm createBlog={mockAddBlog}/>)


  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const submitButton = screen.getByText('create blog')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(submitButton)


  expect(mockAddBlog.mock.calls).toHaveLength(1)
  expect(mockAddBlog.mock.calls[0][0]).toEqual(newBlog)

})