import React from 'react'
import { Link } from 'react-router-dom'

class User extends React.Component {

  render() {

    const user = this.props.user

    return (
      <tr>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
        <td>{user.blogs.length}</td>
      </tr>
    )
  }
}

export default User