import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
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
      this.setState({ blogs: this.sortBlogs(blogs) })
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


  updateBlog = (id, likes) => {
    const blog = this.state.blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes }

    blogService
      .update(id, updatedBlog)
      .then(updatedBlog => {
        this.setState({
          blogs: this.state.blogs
            .map(blog => blog.id !== id ? blog : updatedBlog)
        })
      })
      .catch(() => {
        this.setState({
          error: `the blog '${blog.title}' has been removed from the server`,
          blogs: this.state.blogs.filter(b => b.id !== id)
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 50000)
      })
    this.setState({
      blogs: this.sortBlogs(this.state.blogs)
    })
  }

  deleteBlog = async (id) => {
    const blog = this.state.blogs.find(blog => blog.id === id)
    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      await blogService.deleteBlog(id)
      this.setState({
        blogs: this.state.blogs.filter(b => b.id !== id)
      })
    }
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

  sortBlogs = (blogs) => {
    return blogs.sort((a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    })
  }

  render() {

    const createBlog = () => (
      <Togglable buttonLabel="create">
        <CreateBlog
          helpCreateBlog={this.helpCreateBlog}
        />
      </Togglable>
    )

    const showBlogs = () => (
      this.state.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={this.updateBlog}
          deleteBlog={this.deleteBlog}
        />
      )
    )

    if (this.state.user === null) {
      return (
        <div>
          <Notification.error message={this.state.error} />

          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleLoginFieldChange}
            username={this.state.username}
            password={this.state.password}
          />
        </div>
      )
    }

    return (
      <div>
        <h1>Blogs</h1>

        <Notification.success message={this.state.success} />

        <div>
          <p>{this.state.user.name} logged in
          <button onClick={this.handleLogout}>logout</button></p>
          <h2>blogs</h2>
          {showBlogs()}
        </div>
        <div>
          {createBlog()}
        </div>
      </div>
    )
  }
}

export default App
