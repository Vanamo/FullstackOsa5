import React from 'react'
import { connect } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { newSuccessNotification } from '../reducers/notificationReducer'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    await this.props.newBlog(blogObject)

    this.props.newSuccessNotification(
      `a new blog ${newBlog.title} by ${newBlog.author} added`, 5
    )

    this.setState({
      title: '',
      author: '',
      url: ''
    })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Create new blog</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="url"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { newBlog, newSuccessNotification }
)(CreateBlog)