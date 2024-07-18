import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfigStr = import.meta.env.VITE_FIREBASE_CONFIG;
if (!firebaseConfigStr) {
  throw new Error("Firebase config not found in environment variables.");
}
const firebaseConfig = JSON.parse(firebaseConfigStr);

const app: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);

export { app, firestore, firebaseConfig };
