import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';

class Logout extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    const name = UserProfile.getName();
    if(name===""){
        this.context.router.history.push("/");
    }
    else
    {
        UserProfile.setName("");
        this.context.router.history.push("/");
    }
  }
  render()
  {
      return(
          <div>
          </div>
      );
  }
}
export default Logout;
