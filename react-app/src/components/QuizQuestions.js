import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class QuizQuestions extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
            optionA: "0",
            optionB: "0",
            optionC: "0",
            optionD: "0",
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        const request = new Request('http://127.0.0.1:8080/questions/'+id);
        fetch(request)
        .then(response => response.json())
        .then(data => this.setState({data: data}));
      }
    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("users");
        // this.context.router.history.push("/PlayQuiz/" + this.state.selectedOption);
    }
    handleGChange = (event) => {
        event.preventDefault();
        this.setState({display:true});
        const request = new Request('http://127.0.0.1:8080/quizzes/'+event.target.value);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
    }
    handleChange =(event)=> {
        this.state.selectedOption = event.target.value;
    }
    render() {
        const name = UserProfile.getName();
        if (name !== "admin") {
            return (
                <div className="Error">
                    <h2>You are denied access to this page.</h2>
                </div>
            )
        }

    let change = this.handleChange;
    return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Administrator Panel</h1>
                </header>
                <br></br>
                <br></br>
                <div className="formContainer">
                    <form onSubmit = {this.handleSubmit}>
                        <div className="Error">
                            {this.state.data.map(function(item, key) {
                                <h3>Q.{item.Statement}</h3>
                                    return (
                                        <tr key = {key}>
                                            <td>{item.Name}</td>
                                            <td><input type = "radio" name = "bt" value = {item.id} onChange = {change}/></td>
                                        </tr>
                                        )
                                    })}
                            <br></br>
                            <button>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizQuestions;
