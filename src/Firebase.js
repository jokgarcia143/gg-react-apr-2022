import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore';


const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyB7zdtdf12e4zEGtGr-GPQ5iqjxfYs_Gg0",
    authDomain: "employee-system-1e981.firebaseapp.com",
    projectId: "employee-system-1e981",
    storageBucket: "employee-system-1e981.appspot.com",
    messagingSenderId: "524264961026",
    appId: "1:524264961026:web:682e6e9cc2b47c1074e31b",
    databaseURL: "https://employee-system-1e981-default-rtdb.firebaseio.com"
  };

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;