// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPjE-lxmtubaaND6vuZmhMRdw_Nicj2z8",
    authDomain: "dynafas-92d5b.firebaseapp.com",
    projectId: "dynafas-92d5b",
    storageBucket: "dynafas-92d5b.appspot.com",
    messagingSenderId: "214290117902",
    appId: "1:214290117902:web:3025af59a93a50decf935f",
    measurementId: "G-NHKNPL4L7C"
};

// Initialize Firebase
export const fbApp = initializeApp(firebaseConfig);
export const auth = getAuth(fbApp);
export const db = getFirestore(fbApp);
//const analytics = getAnalytics(app);

//  https://dynafas-92d5b.firebaseapp.com/__/auth/handler