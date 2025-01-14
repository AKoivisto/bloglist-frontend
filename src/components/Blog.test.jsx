import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach } from 'vitest'

let component

const blog = {
  title: 'Blog test title',
  author: 'Bruno Blogger',
  url: 'https://www.blogtests.com/bruno',
  likes: 0,
  user : {
    username: 'testuser',
    name: 'Tero Testailija'
  }
}

const user = {
  username: 'testuser',
  name: 'Tero Testailija'
}

const mockUpdateLikes = vi.fn()
const mockDeleteBlog = vi.fn()

beforeEach(() => {
  component = render(<Blog blog={blog} updateLikes={mockUpdateLikes} user={user} deleteBlog={mockDeleteBlog}/>)
})

test('renders only title', () => {

  // screen.debug()

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.url)
})

test('displays url, likes and user when the view button is clicked', async () => {


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // screen.debug()

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.url)
  expect(component.container).toHaveTextContent(blog.likes)
  expect(component.container).toHaveTextContent(blog.user.name)
})

test('Event handler is called twice when the like button is clicked twice', async () => {

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateLikes.mock.calls).toHaveLength(2)
})
