import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleQuiz = this.handleQuiz.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleUsers= (event)=> {
    event.preventDefault();
    this.context.router.history.push("/ViewPeople");
  }

  handleQuiz= (event)=> {
  event.preventDefault();
    this.context.router.history.push("/Quizzes");
  }
  
  render() {
    const name = localStorage.getItem("username");
    if(name!=="admin")
    {
      return (
        <div className="Error">
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    return ( 
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Administrator Panel</h1>
        </header>
        <br></br>
        <br></br>
        <button onClick={this.handleQuiz}>Quizzes</button>
        <br></br>
        <br></br>
        <button onClick={this.handleUsers}>Users</button>
      </div>
    );
  }
}

export default AdminPanel;
