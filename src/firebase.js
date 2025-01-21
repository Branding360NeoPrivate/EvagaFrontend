// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcXaly8DhkhIxRmF8UbBfe0i0IwVLJtw8",
  authDomain: "evaga-a8fbd.firebaseapp.com",
  projectId: "evaga-a8fbd",
  storageBucket: "evaga-a8fbd.firebasestorage.app",
  messagingSenderId: "901878128567",
  appId: "1:901878128567:web:d416f04bb62b64777b1232",
};

// Initialize Firebase
let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, auth };

