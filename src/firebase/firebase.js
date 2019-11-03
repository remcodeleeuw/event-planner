import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDDDS4cA6plDke1sL40-dTjVB0Ry9s2gXM",
  authDomain: "event-planner-76e4f.firebaseapp.com",
  databaseURL: "https://event-planner-76e4f.firebaseio.com",
  projectId: "event-planner-76e4f",
  storageBucket: "event-planner-76e4f.appspot.com",
  messagingSenderId: "1045675622783",
  appId: "1:1045675622783:web:6a566ab1d6b152b8da9a4a"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
