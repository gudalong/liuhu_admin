import React, { Component } from 'react'


import checkLogin from '../../containers/with-check-login'

@checkLogin
class Home extends Component {
  render() {
    return (
      <div>
       Home........
      </div>
    )
  }
}
export default Home