import { collection, getDocs, query, where } from "firebase/firestore";
import { firebase, FildValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const users = query(
    collection(FildValue, "users"),
    where("username", "==", username)
  );
  const snapshot = await getDocs(users);
  return snapshot.docs.map((user) => user.data().length > 0);
}
