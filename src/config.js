import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeYbH0KStD5cqmbyb9nsayIjCiEZLRmKU",
    authDomain: "to-do-list-57765.firebaseapp.com",
    projectId: "to-do-list-57765",
    storageBucket: "to-do-list-57765.appspot.com",
    messagingSenderId: "256983223330",
    appId: "1:256983223330:web:588a43c377aac423a70e7b",
    measurementId: "G-KZWDRGZTZ8"
};

const fireBaseApp = initializeApp(firebaseConfig);

const db = getFirestore(fireBaseApp);

export { db };

