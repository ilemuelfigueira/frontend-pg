// import { useEffect, useState } from 'react';
// import { deleteToken, getMessaging, getToken } from 'firebase/messaging';
// import firebaseApp from '@/lib/util/firebase';

// const useFcmToken = () => {
//   const [token, setToken] = useState('');
//   const [notificationPermissionStatus, setNotificationPermissionStatus] =
//     useState('');

//   useEffect(() => {
//     const retrieveToken = async () => {
//       try {
//         if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//           const messaging = getMessaging(firebaseApp);

//           // Retrieve the notification permission status
//           const permission = await Notification.requestPermission();
//           setNotificationPermissionStatus(permission);

//           // Check if permission is granted before retrieving the token
//           if (permission === 'granted') {
//             const currentToken = await getToken(messaging, {
//               vapidKey:
//                 'BL90vs4obmbQ-Pn_jsFAX5pCyq0Rfz7tJ4fsFfdOzcHlKNt64P-uzuKMCUwuXW6-r6-gH5gkxS1Lm0tLfUE7bnk',
//             });
//             if (currentToken) {
//               setToken(currentToken);
//             } else {
//               console.log(
//                 'No registration token available. Request permission to generate one.'
//               );
//             }
//           }
//         }
//       } catch (error) {
//         console.log('An error occurred while retrieving token:', error);
//       }
//     };

//     retrieveToken();
//   }, []);

//   return { fcmToken: token, notificationPermissionStatus };
// };

// export default useFcmToken;