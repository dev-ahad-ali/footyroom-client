// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBF7yftglgB5vxK7uhZ9btKLEXfYkg2T4U',
  authDomain: 'footyroom-ffd3a.firebaseapp.com',
  projectId: 'footyroom-ffd3a',
  storageBucket: 'footyroom-ffd3a.appspot.com',
  messagingSenderId: '86796139104',
  appId: '1:86796139104:web:2d018345e4dae5fbb36105',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
