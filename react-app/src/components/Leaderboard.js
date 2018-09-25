import React, { Component } from 'react';
import './ViewPeople.css';
import UserProfile from './UserProfile';
import PropTypes from 'prop-types';
class LeaderBoard extends Component {
    constructor() {
        super();
    }

    static contextTypes = {
        router: PropTypes.object,
    }
    overall = (event) => {
        event.preventDefault();
        this.context.router.history.push("/LeaderboardOverall");
    }
    genre = (event) => {
        event.preventDefault();
        this.context.router.history.push("/LeaderboardGenre");
    }
    quiz = (event) => {
        event.preventDefault();
        this.context.router.history.push("/LeaderboardQuiz");
    }
    render() {
        const name = UserProfile.getName();
        if (name === "") {
            return (
                <div className="Error">
                    <h2>You are denied access to this page.</h2>
                </div>
            )
        }

    return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">LeaderBoard</h1>
                </header>
                <br></br>
                <br></br>
                <div>
                    <button onClick = {this.overall}>Show Overall Leaderboard</button>
                    <br></br>
                    <br></br>
                    <button onClick = {this.genre}>Show Leaderboard by Genre</button>
                    <br></br>
                    <br></br>
                    <button onClick = {this.quiz}>Show Leaderboard by Quiz</button>
                </div>
            </div>
        );
    }
}

export default LeaderBoard;
