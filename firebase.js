import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-mzRnxEKrXqAObBWsIwvH5TCsSWK8Lo",
  authDomain: "hammer-test-cdd15.firebaseapp.com",
  projectId: "hammer-test-cdd15",
  storageBucket: "hammer-test-cdd15.appspot.com",
  messagingSenderId: "915916286288",
  appId: "1:915916286288:web:128b4103f93cc29ff0a455",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
