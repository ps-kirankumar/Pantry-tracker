import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1CbrAAi8isLGKVUyIVWYDKuENlQJskyg",
  authDomain: "pantrytracker-3d9c9.firebaseapp.com",
  projectId: "pantrytracker-3d9c9",
  storageBucket: "pantrytracker-3d9c9.appspot.com",
  messagingSenderId: "278117162086",
  appId: "1:278117162086:web:09b20ade1c020dfdd5e1a7"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
