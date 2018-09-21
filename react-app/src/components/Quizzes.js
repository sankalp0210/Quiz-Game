import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class Quizzes extends Component {
  constructor() {
    super();
    this.state = {
    }
    this.handleCreateQuiz = this.handleCreateQuiz.bind(this);
    this.handleViewQuiz = this.handleViewQuiz.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleCreateQuiz= (event)=> {
    event.preventDefault();
    // console.log("users");
    this.context.router.history.push("/CreateQuiz");
  }
  
  handleViewQuiz= (event)=> {
  event.preventDefault();
    console.log("quizzes");
    this.context.router.history.push("/Quizzes");
  }
  
  render() {
    const name = UserProfile.getName();
    if(name!="asankalp9@gmail.com")
    {
      return (
        <div className="Error">
          {/* <p>{"bt"+name}</p> */}
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    return (
      <div className="App">
        <p>{"dsv"+name}</p>
        <header className="App-header">
          <h1 className="App-title">Administrator Panel</h1>
        </header>
        <br></br>
        <br></br>
        <button onClick={this.handleViewQuiz}>View All Quizzes</button>
        <br></br>
        <br></br>
        <button onClick={this.handleCreateQuiz}>Create a new Quiz</button>
      </div>
    );
  }
}

export default Quizzes;
