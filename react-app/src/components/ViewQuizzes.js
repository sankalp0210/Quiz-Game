import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
class ViewQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedOption: null,
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quizzes');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleRemove= (event)=> {
    event.preventDefault();
    if(this.state.selectedOption!=null)
    {
      fetch('http://localhost:8080/quiz/' + this.state.selectedOption, {
      method: 'DELETE',
      })
        .then(response => {
          if(response.status >= 200 && response.status < 300){
            console.log("Deleted");
            this.context.router.history.push("/Quizzes");
              // window.location.reload();
          }
        });
    }
  }
  handleEdit= (event)=> {
    event.preventDefault();
    if(this.state.selectedOption!=null){
      this.context.router.history.push("/EditQuiz/"+this.state.selectedOption);
    }    
  }
  handleChange =(event)=> {
    this.state.selectedOption = event.target.value;
  }
  render=()=> {
    const name = UserProfile.getName();
    if(name!=="admin")
    {
      return (
        <div className="Error">
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    let deleteRow = this.handleRemove;
    let editRow = this.handleEdit;
    let change = this.handleChange;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizzes</h1>
        </header>
        <form>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.Name}</td>
                      <td>{item.genre}</td>
                      <td><input type = "radio" name = "bt" value = {item.id} onChange = {change}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
        <button onClick={editRow}>Edit</button>
        <button onClick={deleteRow}>Delete</button>
       </form>
      </div>
    );
  }
}

export default ViewQuizzes;
