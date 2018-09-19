import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DeletePerson.css';
class LogIn extends Component {
    constructor() {
      super();
      this.state = {
        formData:{
          email: "",
          password: "",
        },
        submitted: false,
        }
        this.handleEChange = this.handleEChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}
    static contextTypes = {
      router: PropTypes.object,
    }
    handleSubmit= (event)=> {
        event.preventDefault();
        console.log("bt");
        console.log(this.state.formData.email);
        console.log(this.state.formData.password);
        fetch('http://localhost:8080/people/', {
          method: 'POST',
          body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
                this.context.router.history.push("/");
            }
          });
    }
   
    handleEChange(event) {
      this.state.formData.email = event.target.value;
    }
    handlePChange(event) {
      this.state.formData.password = event.target.value;
    }
    render() {
        return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Log In</h1>
        </header>
        <form onSubmit = {this.handleSubmit}>
          <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
          </div>
          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
          </div>
          <br></br>
          <button>Log In</button>
        </form>
        <br></br>
        {this.state.submitted &&
          <div>
            <h2>
              Person successfully signed in.
            </h2>
          </div>
        }
        <br></br>
      </div>
    );
  }
}

export default LogIn;
