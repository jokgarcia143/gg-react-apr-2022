import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
          email: '',
          first_name: '',
          last_name: '',
          number: ''
        };
        
      }

    componentDidMount() {
        const ref = firebase.firestore().collection('employees').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists){
                const employee = doc.data();
                this.setState({
                    key: doc.id,
                    email: employee.email,
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                    number: employee.number
                });
            }
            else
            {
                console.log("No such document!");
            }
        });
    }  
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        //Update state and persist in Collection
        this.setState({book:state});
    }

    onSubmit = (e) => {
        //prevent Postback
        e.preventDefault();
        const {email, first_name, last_name, number} = this.state;
        const updateRef = firebase.firestore().collection('employees').doc(this.state.key);

        updateRef.set({
            email,
            first_name,
            last_name,
            number
        })
        .then((docRef) => {
            this.setState({
                email: '',
                first_name: '',
                last_name: '',
                number: ''
              });
              this.props.history.push("/show/"+this.props.match.params.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
          
    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT employee
                        </h3>
                    </div>

                <div class="panel-body">
                    <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Employee List</Link></h4>
            
                    <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="first_name">First Name:</label>
                                <input type="text" class="form-control" name="first_name" value={this.state.first_name} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="last_name">Last Name:</label>
                                <input type="text" class="form-control" name="last_name" value={this.state.last_name} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="number">Number:</label>
                                <input type="text" class="form-control" name="number" value={this.state.number} onChange={this.onChange} />
                            </div>
                            <button type="submit" class="btn btn-success">Save</button>
                        </form>
          </div>
        </div>
      </div>
        );
    }
}

export default Edit;