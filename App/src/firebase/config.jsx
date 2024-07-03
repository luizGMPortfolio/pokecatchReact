
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3GR0JHv1VRntBviVNc-MoWSPS4v4kaHk",
  authDomain: "pokecatch-76be3.firebaseapp.com",
  databaseURL: "https://pokecatch-76be3-default-rtdb.firebaseio.com",
  projectId: "pokecatch-76be3",
  storageBucket: "pokecatch-76be3.appspot.com",
  messagingSenderId: "822870274518",
  appId: "1:822870274518:web:7410923a11d2d958d87477"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const database = getDatabase(app)

export {db, database};