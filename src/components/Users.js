import React from 'react'
import { connect } from 'react-redux'
import User from './User'

class Users extends React.Component {
  render() {
    console.log(this.props.allUsers)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Blogs added</th>
            </tr>
            {this.props.allUsers.map(u => <User key={u.id} user={u} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers,
  }
}

export default connect(
  mapStateToProps
)(Users)