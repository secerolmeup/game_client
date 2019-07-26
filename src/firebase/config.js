//iini configurasi firebase
import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig ={
  apiKey: process.env.VUE_APP_FBASE_API_KEY,
  authDomain: process.env.VUE_APP_FBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FBASE_PROJECT_ID
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
export default db