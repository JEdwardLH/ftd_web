importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyBOiIqtKGLIYDYGKWisqicEmGlxluHVSQk",
  authDomain: "com-kalanbangaexpress-customer.firebaseapp.com",
  databaseURL: "https://com-kalanbangaexpress-customer-default-rtdb.firebaseio.com",
  projectId: "com-kalanbangaexpress-customer",
  storageBucket: "com-kalanbangaexpress-customer.appspot.com",
  messagingSenderId: "98487205272",
  appId: "1:98487205272:web:889f8c12da422f5327bfed",
  measurementId: "G-F5L2W0WX85"

  });

const messaging = firebase.messaging();
