import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

import "bootstrap/dist/css/bootstrap.min.css";

//Class Component
class App extends Component {
  //Component LifeCycle
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      books: []
    };
  }

  //push = to add new item to Array
  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    //Get friebase DB Collection(books) records
    //forEach loops the collection
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      books
   });
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
            BOOK LIST
          </h3>
        </div>
        <div class="panel-body">
          <h4><Link to="/create" class="btn btn-primary">Add Book</Link></h4>
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.map(book =>
                <tr>
                  <td><Link to={`/show/${book.key}`}>{book.title}</Link></td>
                  <td>{book.description}</td>
                  <td>{book.author}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      );
  }
  
}

export default App;
