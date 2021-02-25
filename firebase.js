// import * as firebase from "firebase";
import firebase from "firebase";
import * as fb from "firebase";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIvjgpppPU_HU45sUHR8Rc3WnzE0sc7Sk",
  authDomain: "slack-clone-6a428.firebaseapp.com",
  databaseURL: "https://slack-clone-6a428.firebaseio.com",
  projectId: "slack-clone-6a428",
  storageBucket: "slack-clone-6a428.appspot.com",
  messagingSenderId: "319053820511",
  appId: "1:319053820511:web:ad096fbfd2f016b24ee1ea",
  measurementId: "G-0SFY2J5M4W",
};

// init the app
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
