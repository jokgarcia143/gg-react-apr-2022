import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDm1ZuJdd8Tl2EBpz5OI_zvNDffqi79fQE",
    authDomain: "my-books-aae50.firebaseapp.com",
    projectId: "my-books-aae50",
    storageBucket: "my-books-aae50.appspot.com",
    messagingSenderId: "195683736743",
    appId: "1:195683736743:web:d11794f6f55ebe21e78f82",
    measurementId: "G-SQ31H0HJP4",
    databaseURL: "https://my-books-aae50-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;