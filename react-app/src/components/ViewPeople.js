import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      selectedOption:null,
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleRemove= (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/people/' + this.state.selectedOption, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          window.location.reload();
        }
      });
  }
  handleChange =(event)=> {
    this.setState({ selectedOption: event.target.value });
  }
  render=()=> {
    const name = localStorage.getItem("username");
    if(name!=="admin")
    {
      return (
        <div className="Error">
          <h2>You are denied access to this page.</h2>
        </div>
      )
    }
    let deleteRow = this.handleRemove;
    let change = this.handleChange;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Users</h1>
        </header>
        <form>
        <table className="table-hover">
          <thead>
            <tr>
              <th>username</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.username}</td>
                      <td><input type = "radio" name = "bt" value = {item.id} onChange = {change}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <button onClick={deleteRow}>Delete</button>
       </form>
      </div>
    );
  }
}

export default ViewPeople;
