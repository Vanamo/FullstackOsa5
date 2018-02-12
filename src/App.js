import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      success: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  helpCreateBlog = (newBlog) => {
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      success: `a new blog ${newBlog.title} by ${newBlog.author} added`
    })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.setState({ user: null })
  }

  render() {

    if (this.state.user === null) {
      return (
        <div>

          <Notification.error message={this.state.error}/>

          <h2>Kirjaudu</h2>

          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button type="submit">kirjaudu</button>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h1>Blogs</h1>

        <Notification.success message={this.state.success}/>

        <div>
          <p>{this.state.user.name} logged in
          <button onClick={this.handleLogout}>logout</button></p>
          <h2>blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        <div>
          <CreateBlog helpCreateBlog={this.helpCreateBlog}/>
        </div>
      </div>
    )
  }
}

export default App
