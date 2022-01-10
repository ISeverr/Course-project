import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAi6-rytr33-Q0wKVfBtedAMV69YaHZelc",
  authDomain: "project-course-v-2.firebaseapp.com",
  projectId: "project-course-v-2",
  storageBucket: "project-course-v-2.appspot.com",
  messagingSenderId: "1060974440607",
  appId: "1:1060974440607:web:3cd4a96731c4d3aa9f32aa",
  measurementId: "G-BCLTYMZJ79"
};

console.log(firebaseConfig)


const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
