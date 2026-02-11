import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut } from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBHqNaHn-vK75OyEjJtmSyHiQjywjj8yxg",
  authDomain: "netflix-clone-bc940.firebaseapp.com",
  projectId: "netflix-clone-bc940",
  storageBucket: "netflix-clone-bc940.firebasestorage.app",
  messagingSenderId: "796249573212",
  appId: "1:796249573212:web:c057288533825de9ebe399"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res =await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};

