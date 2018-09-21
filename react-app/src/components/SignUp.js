import React, { Component } from 'react';
import './SignUp.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        Name: "",
        username: "",
        password: "",
      },
      submitted: false,
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        this.setState({submitted: true});
        this.context.router.history.push("/LogIn");
      });
  }

  handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  render() {
    const name = UserProfile.getName();
    // if(name != "")
    // {
    //   return (
    //     <div className="Error">
    //       <h2>You are already logged in.</h2>
    //     </div>
    //   )
    // }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.Name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New user successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default SignUp;
