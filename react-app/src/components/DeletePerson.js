import React, { Component } from 'react';
import './DeletePerson.css';
class DeletePerson extends Component {
    constructor() {
      super();
      this.state = {
          selectedOption: '1',
          data: [],
          submitted: false,
        }
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        //  body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status >= 200 && response.status < 300){
                window.location.reload();
                this.setState({submitted: true});

            }
          });
    }
    handleChange (event) {
        this.state.selectedOption = event.target.value;
        console.log("bt");
    }
    render() {
        // function Rowdelete(id){

        // }
        return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <form onSubmit = {this.handleRemove}>
        <table className="table-hover">
          <thead>
            <tr>
                <th></th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=> {
               return (
                    <tr key = {key}>
		           		<td><input type = "radio" name = "bt" value = {item.id} onChange = {this.handleChange}/></td>
	                    <td>{item.id}</td>
	                    <td>{item.firstname}</td>
	                    <td>{item.lastname}</td>
	                    <td>{item.city}</td>
                    </tr>
                )
             })}
          </tbody>
        </table>
        <br></br>
        <button>Delete</button>
        </form>
        <br></br>
        {this.state.submitted &&
          <div>
            <h2>
              Person successfully removed.
            </h2>
          </div>
        }
        <br></br>
      </div>
    );
  }
}

export default DeletePerson;
