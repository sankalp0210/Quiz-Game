import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';

class Logout extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    localStorage.clear()
    window.location.reload();
    this.context.router.history.push("/");
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
