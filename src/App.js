import React from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { newSuccessNotification, newErrorNotification } from './reducers/notificationReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import './index.css'

class App extends React.Component {

  state = {
    username: '',
    password: ''
  }


  componentDidMount() {
    this.props.initializeBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser({ user })
      blogService.setToken(user.token)
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('n', newProps)
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
          blogs: this.state.blogs.filter(b => b.id !== id)
        })
        this.props.newErrorNotification(
          `the blog '${blog.title}' has been removed from the server`, 5)
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

      this.setState({ username: '', password: '' })
      this.props.setUser({ user })
    } catch (exception) {
      this.props.newErrorNotification('wrong username or password', 5)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.props.logoutUser()
  }

  render() {

    const createBlog = () => (
      <Togglable buttonLabel="create">
        <CreateBlog
          helpCreateBlog={this.helpCreateBlog}
        />
      </Togglable>
    )

    const showBlogs = () => {
      return this.props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={this.updateBlog}
          deleteBlog={this.deleteBlog}
          user={this.props.user}
        />
      )
    }

    if (this.props.user.username === null) {
      return (
        <div>
          <Notification />

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

        <Notification />

        <div>
          <p>{this.props.user.name} logged in
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

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    if (a.likes < b.likes) return 1
    if (a.likes > b.likes) return -1
    return 0
  })
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: sortBlogs(state.blogs)
  }
}

export default connect(
  mapStateToProps,
  {
    newSuccessNotification,
    newErrorNotification, setUser, logoutUser,
    initializeBlogs
  }
)(App)
