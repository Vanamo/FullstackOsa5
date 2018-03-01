import React from 'react'

class UserInfo extends React.Component {
  render() {
    const user = this.props.user

    const showBlog = (blog) => {
      return (
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      )
    }

    console.log('user', this.props.user)
    if (user === undefined) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <p>added blogs:</p>
        {this.props.user.blogs.map(blog => showBlog(blog))}
      </div>
    )
  }
}

export default UserInfo