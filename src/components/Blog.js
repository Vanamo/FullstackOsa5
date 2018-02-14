import React from 'react'
import BlogInfo from './BlogInfo'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  handleClick = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const blog = this.props.blog
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showBlogInfo = () => (
      <BlogInfo
        key={blog.id}
        blog={blog}
        updateBlog={this.props.updateBlog}
        deleteBlog={this.props.deleteBlog}
        user={this.props.user}
      />
    )

    return (
      <div style={blogStyle}>
        <div onClick={this.handleClick} style={{ cursor: 'pointer' }}>
          {blog.title} {blog.author}
        </div>
        {this.state.show && showBlogInfo()}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog