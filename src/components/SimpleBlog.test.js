import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    likes: 2
  }

  let blogComponent
  let contentDiv
  let likeDiv
  const mockHandler = jest.fn()
  beforeEach(() => {
    blogComponent = shallow(
      <SimpleBlog 
        blog={blog}
        onClick={mockHandler}
      />)
    contentDiv = blogComponent.find('.content')
    likeDiv = blogComponent.find('.likes')
  })

  it('renders title', () => {
    expect(contentDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    expect(likeDiv.text()).toContain(blog.likes)
  })

  it('clicking the button calls event handler', () => {
    const button = blogComponent.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})