import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCBcgLNpvPEZDmLaQvCVW7gxtQiRnlj_xI",
    authDomain: "ninja-gram-ce2bc.firebaseapp.com",
    projectId: "ninja-gram-ce2bc",
    storageBucket: "ninja-gram-ce2bc.appspot.com",
    messagingSenderId: "451986977517",
    appId: "1:451986977517:web:94cbc75bd21929c4e892e4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage()
  const projectFirestore = firebase.firestore()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {projectStorage, projectFirestore, timestamp}