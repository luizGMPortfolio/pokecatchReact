
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9J0KMEeVhc9QZwqkqKX1kG8Ca73oqZuk",
  authDomain: "pokecatch1-1.firebaseapp.com",
  projectId: "pokecatch1-1",
  storageBucket: "pokecatch1-1.appspot.com",
  messagingSenderId: "862766223897",
  appId: "1:862766223897:web:37f4351056924c16c8d088",
  measurementId: "G-DCN9B9S1BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app)
const analytics = getAnalytics(app);

export {db, database, analytics};