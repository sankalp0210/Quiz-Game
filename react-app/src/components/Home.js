import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css'

class Home extends Component {
  
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    const name = localStorage.getItem("username");
    if(name!==null)
    {
      this.context.router.history.push("/Profile");
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h2>Welcome to the Quiz-App</h2>
      </div>
    );
  }
}

export default Home;
