import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';


class Create extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('employees');
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            number: ''
        };
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email, first_name, last_name, number} = this.state;

        this.ref.add({
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
            this.props.history.push("/")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
          });
    }

    render() {
        const {email, first_name, last_name, number} = this.state;

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD EMPLOYEE
                        </h3>
                    </div>

                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">Employee List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="first_name">First Name:</label>
                                <input type="text" class="form-control" name="first_name" value={first_name} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="last_name">Last Name:</label>
                                <input type="text" class="form-control" name="last_name" value={last_name} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} />
                            </div>
                            <div class="form-group">
                                <label for="number">Number:</label>
                                <input type="text" class="form-control" name="number" value={number} onChange={this.onChange} />
                            </div>
                            <button type="submit" class="btn btn-success">Save</button>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

export default Create;