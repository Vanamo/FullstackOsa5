import React from 'react'
import LoginForm from './Login'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target)
  }

  render() {
    return (
      <LoginForm
        handleSubmit={this.props.onSubmit}
        handleChange={this.onChange}
        username={this.state.username}
        password={this.state.password}
      />
    )
  }
}

export default Wrapper