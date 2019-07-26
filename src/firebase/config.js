// iini configurasi firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY_FBASE,
  authDomain: process.env.VUE_APP_AUTH_FBASE,
  projectId: process.env.VUE_APP_PROJECT_ID_FBASE
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
export default db
