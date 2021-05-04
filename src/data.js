import firebase from 'firebase';

const config = {
apiKey: "AIzaSyA8IvpJtTMfU3lIbjYqx2R2oiGu-IuLAgE",
authDomain: "database-5f4cf.firebaseapp.com",
databaseURL:"https://database-5f4cf-default-rtdb.firebaseio.com/",
projectId: "database-5f4cf",
storageBucket: "database-5f4cf.appspot.com",
messagingSenderId: "700072090990",
appId: "1:700072090990:web:d68a5b18c31e087b6bf57f",
measurementId: "G-M5R6SCF6EK"
};

const Firebase = firebase.initializeApp(config);
const storage = Firebase.storage();

export { Firebase , storage as default};
