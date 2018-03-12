import React from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import { newSuccessNotification, newErrorNotification } from './reducers/notificationReducer'
import { setUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Users from './components/Users'
import { initUsers } from './reducers/allUsersReducer'
import UserInfo from './components/UserInfo'
import './index.css'

class App extends React.Component {

  state = {
    username: '',
    password: ''
  }


  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initUsers()

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
    const blog = this.props.blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes }

    this.props.updateBlog(updatedBlog)
  }

  deleteBlog = (id) => {
    const blog = this.props.blogs.find(blog => blog.id === id)
    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      this.props.deleteBlog(id)
      this.props.newSuccessNotification(`'${blog.title}' deleted`, 5)
    }
  }

  login = (event) => {
    event.preventDefault()
    const user = ({
      username: this.state.username,
      password: this.state.password
    })

    this.props.loginUser(user)

    this.setState({ username: '', password: '' })

  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogout = () => {
    window.localStorage.clear()
    this.props.logoutUser()
  }

  render() {
    console.log('render')

    const userById = (id) => {
      console.log('allUsers', this.props.allUsers)
      const user = this.props.allUsers.find(u => u.id === String(id))
      console.log('u', user)
      return user
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
        <Router>
          <div>
            <div>
              <NavigationMenu />
              <Notification />
              <p>{this.props.user.name} logged in
              <button onClick={this.handleLogout}>logout</button></p>
            </div>
            <div>
              <Route exact path="/" render={() => <BlogList />} />
              <Route exact path="/users" render={() => <Users />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <UserInfo user={userById(match.params.id)} />}
              />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const NavigationMenu = () => (
  <div>
    <Link to='/'>blogs</Link> &nbsp;
    <Link to='/users'>users</Link>
  </div>
)

const mapStateToProps = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  {
    newSuccessNotification,
    newErrorNotification, setUser,
    loginUser, logoutUser, initUsers,
    initializeBlogs, updateBlog, deleteBlog
  }
)(App)
