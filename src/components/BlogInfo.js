import React from 'react'

class BlogInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.blog.likes
    }
  }

  handleClick = async () => {
    await this.setState({ likes: this.state.likes + 1 })
    this.props.updateBlog(this.props.blog.id, this.state.likes)
  }

  render() {
    const blog = this.props.blog
    const showUser = blog.user ? `added by ${blog.user.name}` : ''

    return (
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={this.handleClick}>like</button></div>
        {showUser}
      </div>
    )
  }
}

export default BlogInfo