import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/Login'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import store from './store'
import { Provider } from 'react-redux'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('only login form is rendered if user not logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(0)

      const loginForm = app.find(LoginForm)
      expect(loginForm.length).toBe(1)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      app = mount(<Provider store={store}><App /></Provider>)
    })

    it('renders all blogs it gets from backend', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})