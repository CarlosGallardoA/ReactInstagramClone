import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const docRef = doc(FildValue, "users", loggedInUserDocId);
  await updateDoc(docRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  const docRef = doc(FildValue, "users", profileDocId);
  await updateDoc(docRef, {
    followers: isFollowingProfile
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId),
  });
}

export async function getPhotos(userId, following) {
  const result = query(
    collection(FildValue, "photos"),
    where("userId", "in", following)
  );
  const snapshot = await getDocs(result);
  const photos = snapshot.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  const photosWithUserDetails = await Promise.all(
    photos.map(async (photo) => {
      let userLinkedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLinkedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLinkedPhoto };
    })
  );
  return photosWithUserDetails;
}
