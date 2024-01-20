import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, rerender, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogsService from '../services/blogsService'
import BlogCreate from './BlogCreate'

//Mocking blogsService.addLike and blogsService.createBlog
jest.mock('../services/blogsService', () => ({
    addLike: jest.fn(),
    createBlog: jest.fn()
}))



//Dummy blog
const blog = {
    title: 'Sample Blog 114',
    author: 'John Doe',
    url: 'http://some.address.com',
    likes: 15,
    user: {
        username: 'testuser1'
    }
}


//Clearing mocks between tests with clearAllMocks
beforeEach(() => {
    jest.clearAllMocks()
})


test('Component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {

    const { container } = render(<Blog blog={blog} />)

    const blogEntity = container.querySelector('.blog-entity')
    expect(blogEntity).toHaveTextContent('Sample Blog 114')

    const buttonView = container.querySelector('.buttonView')
    expect(buttonView).not.toHaveStyle('display: none')

    const buttonHide = container.querySelector('.buttonHide')
    expect(buttonHide).toHaveStyle('display: none')


    const blogHidePart = container.querySelector('.blogHidePart')
    expect(blogHidePart).toHaveStyle('display: none')
})


test('Blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {

    let blogDetailsVisible = false

    const setBlogDetailsVisible = () => {
        blogDetailsVisible = true
    }


    const { container, rerender } = render(<Blog blog={blog} blogDetailsVisible={blogDetailsVisible} setBlogDetailsVisible={setBlogDetailsVisible} />)

    let blogEntity, blogHidePart, buttonView, buttonHide


    blogEntity = container.querySelector('.blog-entity')
    expect(blogEntity).toHaveTextContent('Sample Blog 114')

    buttonView = container.querySelector('.buttonView')
    expect(buttonView).not.toHaveStyle('display: none')

    buttonHide = container.querySelector('.buttonHide')
    expect(buttonHide).toHaveStyle('display: none')

    blogHidePart = container.querySelector('.blogHidePart')
    expect(blogHidePart).toHaveStyle('display: none')

    //Clicking "View" button!..
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    rerender(<Blog blog={blog} blogDetailsVisible={blogDetailsVisible} />)

    blogEntity = container.querySelector('.blog-entity')
    expect(blogEntity).toHaveTextContent('Sample Blog 114')

    buttonView = container.querySelector('.buttonView')
    expect(buttonView).toHaveStyle('display: none')

    buttonHide = container.querySelector('.buttonHide')
    expect(buttonHide).not.toHaveStyle('display: none')


    blogHidePart = container.querySelector('.blogHidePart')
    expect(blogHidePart).not.toHaveStyle('display: none')
})



test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {



    const mockSetMessage = jest.fn()

    const { container } = render(<Blog blog={blog} setMessage={mockSetMessage} blogDetailsVisible={true} />)

    const user = userEvent.setup()
    const button = container.querySelector('.button-likes')
    await user.click(button)
    await user.click(button)


    expect(blogsService.addLike.mock.calls).toHaveLength(2)
    expect(mockSetMessage.mock.calls).toHaveLength(2)
})


test('Form calls the event handler it received as props with the right details when a new blog is created', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()

    const dummyRef = {
        current: {
            toggleVisibility: function () {
                return true
            }
        }
    }

    render(<BlogCreate setMessage={() => true} newBlogFormRef={dummyRef} />)


    const inputs = screen.getAllByRole('textbox')

    const title = inputs[0]
    const author = inputs[1]
    const url = inputs[2]

    const sendButton = screen.getByText('Add blog')

    await user.type(title, 'testing a form...')
    await user.type(author, 'sample author...')
    await user.type(url, 'sample url...')

    await user.click(sendButton)

    expect(blogsService.createBlog.mock.calls).toHaveLength(1)
    expect(blogsService.createBlog.mock.calls[0][0]).toBe('testing a form...')
    expect(blogsService.createBlog.mock.calls[0][1]).toBe('sample author...')
    expect(blogsService.createBlog.mock.calls[0][2]).toBe('sample url...')
})