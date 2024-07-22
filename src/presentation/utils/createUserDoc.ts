import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase.config";

export function createUserDoc(uid: string) {
  const docRef = doc(firestore, `users/${uid}`);
  setDoc(docRef, { user: [{ id: uid }], transactions: [] });
}
