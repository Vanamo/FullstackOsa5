import React from 'react'

class BlogInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.blog.likes
    }
  }

  handleLike = async () => {
    await this.setState({ likes: this.state.likes + 1 })
    this.props.updateBlog(this.props.blog.id, this.state.likes)
  }

  handleDelete = () => {
    this.props.deleteBlog(this.props.blog.id)
  }

  render() {
    const blog = this.props.blog
    const showUser = blog.user ? `added by ${blog.user.name}` : ''
    const deleteButton = {
      color: 'white',
      backgroundColor: 'blue'
    }

    let button = null
    if (!blog.user || blog.user.username === this.props.user.username) {
      button = <button onClick={this.handleDelete} style={deleteButton}>delete</button>
    }

    return (
      <div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={this.handleLike}>like</button></div>
        {showUser}
        <div>
          {button}
        </div>
      </div>
    )
  }
}

export default BlogInfo