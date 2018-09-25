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
      add:null,
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 
  static contextTypes = {
    router: PropTypes.object,
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log("bt" + id);
    const request = new Request('http://127.0.0.1:8080/questions/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleRemove= (event)=> {
    event.preventDefault();
    if(this.state.selectedOption!=null)
    {
      fetch('http://localhost:8080/question/' + this.state.selectedOption, {
      method: 'DELETE',
      })
        .then(response => {
          if(response.status >= 200 && response.status < 300){
            console.log("Deleted");
            this.context.router.history.push("/ViewQuizzes");
              // window.location.reload();
          }
        });
    }
  }

  handleEdit= (event)=> {
    event.preventDefault();
    if(this.state.selectedOption!=null){
      this.context.router.history.push("/EditQuestion/"+this.state.selectedOption);    
    }
  }
  handleAdd= (event)=> {
    event.preventDefault();
    let id = this.props.match.params.id;
    console.log(id);
    fetch('http://localhost:8080/questions/'+id, {
     method: 'POST',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          // console.log(response.json())
          response.json()
            .then(
              data => {console.log(data);this.context.router.history.push("/EditQuestion/"+data)}
            )
            // window.location.reload();
        }
      });
  }
  handleChange =(event)=> {
    this.setState({selectedOption : event.target.value});
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
    let addRow = this.handleAdd;
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
              <th>Question Statement</th>
              <th>Type</th>
              <th>Option A</th>
              <th>Option B</th>
              <th>Option C</th>
              <th>Option D</th>
              <th>Ans A</th>
              <th>Ans B</th>
              <th>Ans C</th>
              <th>Ans D</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.Statement}</td>
                      <td>{item.Type}</td>
                      <td>{item.optA}</td>
                      <td>{item.optB}</td>
                      <td>{item.optC}</td>
                      <td>{item.optD}</td>
                      <td>{item.ansA}</td>
                      <td>{item.ansB}</td>
                      <td>{item.ansC}</td>
                      <td>{item.ansD}</td>
                      <td><input type = "radio" name = "bt" value = {item.id} onChange = {change}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
        <button onClick={editRow}>Edit Question</button>
        <button onClick={deleteRow}>Delete Question</button>
        <br></br>
        <br></br>
        <button onClick={addRow}>Add a new Question</button>
       </form>
      </div>
    );
  }
}

export default ViewQuizzes;
