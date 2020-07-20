import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyD5NchGCicsWzHWM26btuXPN4X1g8q6RwY",
  authDomain: "redux-slack-clone-e2e00.firebaseapp.com",
  databaseURL: "https://redux-slack-clone-e2e00.firebaseio.com",
  projectId: "redux-slack-clone-e2e00",
  storageBucket: "redux-slack-clone-e2e00.appspot.com",
  messagingSenderId: "1008220922439",
  appId: "1:1008220922439:web:b3f8be1aed9e2437500762",
  measurementId: "G-BW1XDGP6XY",
};
firebase.initializeApp(config);

export default firebase;
