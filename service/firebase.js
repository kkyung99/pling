import * as firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyAFPICxhrVdXlFQ7DK0ViK1hM-bLwVH98Q",
  // authDomain: "plant-79a5f.firebaseapp.com",
  // projectId: "plant-79a5f",
  // databaseURL: "https://plant-79a5f-default-rtdb.firebaseio.com/",
  // storageBucket: "plant-79a5f.appspot.com",
  // messagingSenderId: "160413359933",
  // appId: "1:160413359933:web:0f17b8be74251195bbef54",
  // measurementId: "G-W84DF12RKQ",

  apiKey: process.env.REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: process.env.REACT_NATIVE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_NATIVE_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_NATIVE_FIREBASE_DB_URL,
  storageBucket: process.env.REACT_NATIVE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_NATIVE_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_NATIVE_FIREBASE_APP_ID,
  measurementId: process.env.REACT_NATIVE_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase

const init = async () => {
  await firebase.initializeApp(firebaseConfig);
};
export default init;
