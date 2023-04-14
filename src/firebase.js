import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBLXZjGDswGr7uwqt5AAfKhPYMfWSHV5Xk",
    authDomain: "project1-e33ba.firebaseapp.com",
    projectId: "project1-e33ba",
    storageBucket: "project1-e33ba.appspot.com",
    messagingSenderId: "31961257062",
    appId: "1:31961257062:web:e94af5979aaa7a70aa09a7"
  };

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = app.firestore();


export {auth , storage , db };