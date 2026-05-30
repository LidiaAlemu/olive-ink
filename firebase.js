// Firebase configuration (CDN compat version)
const firebaseConfig = {
  apiKey: "AIzaSyCgNgWfQ_HdZAx4wxLgz8QgLFm_BYpVj1A",
  authDomain: "olive-ink.firebaseapp.com",
  projectId: "olive-ink",
  storageBucket: "olive-ink.firebasestorage.app",
  messagingSenderId: "315959243112",
  appId: "1:315959243112:web:9b6aae19efa46d14bb26dd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
window.db = db;
window.auth = auth;