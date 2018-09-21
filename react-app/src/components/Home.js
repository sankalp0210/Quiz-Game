import React, { Component } from 'react';
import NewComponent from './NewComponent';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
import './Home.css'

class Home extends Component {
  
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    const name = UserProfile.getName();
    if(name!="")
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
        <NewComponent text={"This text comes from another component called newComponent.js"}/>
      </div>
    );
  }
}

export default Home;
