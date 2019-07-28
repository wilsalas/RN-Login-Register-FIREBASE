import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBmz5vza6jtUV2nDqehX7fclaAfLiEWvMY",
    authDomain: "userdata-f6055.firebaseapp.com",
    databaseURL: "https://userdata-f6055.firebaseio.com",
    projectId: "userdata-f6055",
    storageBucket: "",
    messagingSenderId: "608088922617",
    appId: "1:608088922617:web:4e994e9ec1a2c296"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;