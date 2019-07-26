//iini configurasi firebase
import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig ={
    apiKey: "AIzaSyCNp6ouPdYfwO2NM8XwCaiQYIBJ4gsdmAA",
    authDomain: "projectgame-b35ad.firebaseapp.com",
    databaseURL: "https://projectgame-b35ad.firebaseio.com",
    projectId: "projectgame-b35ad",
    storageBucket: "",
    messagingSenderId: "531071848722",
    appId: "1:531071848722:web:230b2de7344af427"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
export default db