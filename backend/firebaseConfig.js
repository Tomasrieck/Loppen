import * as firebase from "firebase";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC2p9OKc0KBxBWdAZm6Bp_4u4Q2orr52iY",
  authDomain: "loppenappen.firebaseapp.com",
  databaseURL:
    "https://loppenappen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loppenappen",
  storageBucket: "loppenappen.appspot.com",
  messagingSenderId: "618616377444",
  appId: "1:618616377444:web:4d5c73c5d5298824928f71",
  measurementId: "G-WSJJ8N1314",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
