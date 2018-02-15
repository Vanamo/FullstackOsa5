import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import BlogInfo from './BlogInfo'

describe('<Blog />', () => {

  const blog = {
    title: 'Testiblogi',
    author: 'Testaaja',
    url: 'http://test.blog'
  }

  let blogComponent
  beforeEach(() => {
    blogComponent = shallow(
      <Blog 
        blog={blog}
      />)
  })

  it('clicking the button shows bloginfo', () => {
    const button = blogComponent.find('.clickMe')
    let blogInfoComponent = blogComponent.find(BlogInfo)
    expect(blogInfoComponent.length).toBe(0)

    button.simulate('click')
    blogInfoComponent = blogComponent.find(BlogInfo)
    expect(blogInfoComponent.length).toBe(1)
  })
})