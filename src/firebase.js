import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBMgbU3wrWtohbrN38V1VVaWjGLP7jyAT4",
  authDomain: "project-course-28eb2.firebaseapp.com",
  projectId: "project-course-28eb2",
  databaseURL: "https://project-course-28eb2-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "project-course-28eb2.appspot.com",
  messagingSenderId: "776590484006",
  appId: "1:776590484006:web:7725b1668d41ed5e1e7ce7",
  measurementId: "G-DTTBX0H4BQ"
};

console.log(firebaseConfig)


const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
