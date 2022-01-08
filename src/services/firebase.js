import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { firebase, FildValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const users = query(
    collection(FildValue, "users"),
    where("username", "==", username)
  );
  const snapshot = await getDocs(users);
  return snapshot.docs.map((user) => user.data().length > 0);
}

// get user from the firebase where userId === user.uid
export async function getUserByUserId(userId) {
  const result = query(
    collection(FildValue, "users"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(result);
  const user = snapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = query(collection(FildValue, "users"), limit(10));
  const snapshot = await getDocs(result);
  const profiles = snapshot.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
  return profiles;
}
