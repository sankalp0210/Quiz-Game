import React, { Component } from 'react';
import './SignUp.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Question: "",
        A: "",
        B: "",
        C: "",
        D: "",
      },
      error: false,
      errorMsg: "",
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    const name = UserProfile.getName();
    if(name==="")
    {
      this.context.router.history.push("/Profile");
    }
  }
  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/quiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
        this.context.router.history.push("/EditQuiz/");}
        else if(response.status >= 300 && response.status < 350){
          this.setState({ error: true });
          this.setState({ errorMsg: "Name already exists" });
        }
        else{
          this.setState({ error: true });
          this.setState({ errorMsg: "Fields Cannot be left empty" });  
        }
      });
  }

  handleNChange(event) {
    let y = {...this.state.formData, "Name":event.target.value};
    this.setState({formData:y});
  }
  handleGChange(event) {
    let y = {...this.state.formData, "genre":event.target.value};
    this.setState({formData:y});
  }
  render() {
    const name = UserProfile.getName();
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
          <h1 className="App-title">Sign Up</h1>
        </header>
        <br/><br/>
        {this.state.error &&
          <div className="Error">
            <p>
              {""+this.state.errorMsg}
            </p>
          </div>
        }
        <br></br>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.Name} onChange={this.handleNChange}/>
            </div>
            {/* <button type="submit" className="btn btn-default">Submit</button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default EditQuiz;