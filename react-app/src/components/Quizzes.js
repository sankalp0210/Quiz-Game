import React, { Component } from 'react';
import './ViewPeople.css';
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
    this.context.router.history.push("/CreateQuiz");
  }
  
  handleViewQuiz= (event)=> {
  event.preventDefault();
    this.context.router.history.push("/ViewQuizzes");
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
          <h1 className="App-title">Quizzes</h1>
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
