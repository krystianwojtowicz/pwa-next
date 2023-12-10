import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        throw new Error("User not found");
      case "auth/wrong-password":
        throw new Error("Wrong password");
      default:
        throw new Error(
          "User not found or wrong password or something went wrong"
        );
    }
  }
};
