// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

// const firebaseConfig = {
//   apiKey: "AIzaSyA8mFmMtTgvL24wBhzhJ1jBwj9tu5iFptc",
//   authDomain: "implementation-626e4.firebaseapp.com",
//   projectId: "implementation-626e4",
//   storageBucket: "implementation-626e4.appspot.com",
//   messagingSenderId: "639533572683",
//   appId: "1:639533572683:web:1500f63770a28ed1d723ce",
//   measurementId: "G-YJEE1V32WH"
// };;
// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: './logo.png',
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });