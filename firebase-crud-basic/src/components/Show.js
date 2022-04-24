import React, { Component } from 'react'
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";

export class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
          book: {},
          key: ''
        };
      }
      
    componentDidMount() {
        const ref = firebase.firestore().collection('books').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists){
               this.setState({
                   book: doc.data(),
                   key: doc.id,
                   isLoading: false
               });
            }
            else{
                console.log("No such document!");
            }
        });
    }

    delete(id){
        firebase.firestore().collection('books').doc(id).delete().then(() => {
            console.log("Deleted");
            //Redirect to default page
            this.props.history.push("/")
        }).catch((error) => {
            console.log("Error Deleting", error);
        });
    }

    render() {
        return (
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4><Link to="/">Board List</Link></h4>
                    <h3 class="panel-title">
                        {this.state.book.title}
                    </h3>
                </div>
                <div class="panel-body">
                <dl>
                    <dt>Description:</dt>
                    <dd>{this.state.book.description}</dd>
                    <dt>Author:</dt>
                    <dd>{this.state.book.author}</dd>
                </dl>
                <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                </div>
        </div>
      </div>
        );
    }
}

export default Show
