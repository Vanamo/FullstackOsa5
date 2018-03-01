import React from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import { connect } from 'react-redux'

class BlogList extends React.Component {
  render() {
    const createBlog = () => (
      <Togglable buttonLabel="create">
        <CreateBlog />
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

    return (
      <div>
        <div>
          <h2>blogs</h2>
          {showBlogs()}
        </div >
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
  mapStateToProps
)(BlogList)