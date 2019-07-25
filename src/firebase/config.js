//iini configurasi firebase
import firebase from 'firebase/app';
import 'firebase/firebase-firestore'

const firebaseConfig ={

}

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()
export default db