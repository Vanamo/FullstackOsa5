import React from 'react'
import BlogInfo from './BlogInfo'

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

export default Blog