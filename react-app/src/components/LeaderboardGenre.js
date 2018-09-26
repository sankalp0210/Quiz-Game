import React, { Component } from 'react';
import './ViewPeople.css';
import PropTypes from 'prop-types';
class LeaderBoardGenre extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
        }
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount (){
        const request = new Request('http://127.0.0.1:8080/leaderboard/genre/science');
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
 
    }

    handleGChange = (event) => {
        event.preventDefault();
        this.setState({selectedOption:null});
        const request=new Request('http://127.0.0.1:8080/leaderboard/genre/'+event.target.value);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}));
    }

    render() {
    const name = localStorage.getItem("username");
        if (name === null) {
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
                    <h1 className="App-title">LeaderBoard</h1>
                </header>
                <br></br>
                <br></br>
                <div className="formContainer">
                    <form onSubmit = {this.handleSubmit}>
                        <div className="form-group">
                            <label>Genre</label>
                            <select onChange={this.handleGChange} value={this.state.value}>
                                <option value="science">Science</option>
                                <option value="sports">Sports</option>
                                <option value="tv series">TV Series</option>
                                <option value="gk">General Knowledge</option>
                            </select>
                        </div>
                        <div className="Error">

                            <table className="table-hover">
                                <thead>
                                    <tr>
                                    <th>Quiz Name</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>{this.state.data.map(function(item, key) {
                                    return (
                                        <tr key = {key}>
                                            <td>{item.Name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.score}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <br></br>
                            {/* <button>Show Leaderboard</button> */}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LeaderBoardGenre;
