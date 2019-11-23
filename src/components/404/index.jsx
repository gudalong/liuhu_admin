import React, { Component } from 'react'
import checkLogin from '../../containers/with-check-login'

@checkLogin
class NotFound extends Component {
  render() {
    return (
      <div>
        404
      </div>
    )
  }
}

export default  NotFound
