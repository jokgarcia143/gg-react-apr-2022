import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {

  constructor(props){
    super(props);

    this.ref = firebase.firestore().collection('employees');
    this.unsubscribe = null;
    this.state = {
      employees: []
    };
  }

  //push - to add new item to Array
  onCollectionUpdate = (querySnapshot) => {
    const employees = [];
    //Get firestore DB Collection(Employees)
    //foreach loops the collection
    querySnapshot.forEach((doc) => {
      const {email, first_name, last_name, number} = doc.data();
      employees.push({
        key: doc.id,
        doc, //Snapshot Document
        email,
        first_name,
        last_name,
        number,
      });
    });
    this.setState({
      employees
    });
    //

  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              WELCOME!
            </h3>
          </div>
        </div>
        
        <div class="panel-body">
          <h4><Link to="/create" class="btn btn-primary">New Employee</Link></h4>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
                {
                 this.state.employees.map( employee => 
                 <tr>
                   <td><Link to={`/show/${employee.key}`} >{employee.first_name + " " + employee.last_name}</Link></td>
                   <td>{employee.email}</td>
                   <td>{employee.number}</td>
                 </tr>
                 )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;