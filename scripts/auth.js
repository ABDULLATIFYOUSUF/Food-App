// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEcoKPxtqi5C2ha25qGcW-XiS95i-b6Rs",
  authDomain: "memon-foods-d3a82.firebaseapp.com",
  projectId: "memon-foods-d3a82",
  storageBucket: "memon-foods-d3a82.appspot.com",
  messagingSenderId: "835855711142",
  appId: "1:835855711142:web:211a9bdaa4cfa6b6ca2d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signup)

const myModal = document.querySelectorAll(".modal")

async function signup(e) {
  try {
    const fullName = document.querySelector("#fullName").value
    const phoneNumber = document.querySelector("#phoneNumber").value
    const email = document.querySelector("#signupEmail").value
    const password = document.querySelector("#signupPassword").value
    const type = document.querySelector("#type").value
    if (!fullName || !phoneNumber || !email || !password || !type) {
      M.toast({ html: "required field are missing", classes: `red` })
      return
    }

    const result = await createUserWithEmailAndPassword(auth, email, password)
    const uid = result.user.uid
    M.toast({ html: "welcome " + fullName, classes: `green` })
    const docRef = await addDoc(collection(db, "users"), {
      fullName,
      phoneNumber,
      email,
      accountActivate: true,
      uid,
      type
    });

  } catch (error) {
    console.log("error", error.message)
    M.toast({ html: error.message, classes: `red` })
  }

  M.Modal.getInstance(myModal[0]).close()
  window.location.assign("/")
}


const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click", login)

async function login(e) {
  try {

    const email = document.querySelector("#loginEmail").value
    const password = document.querySelector("#loginPassword").value

    const loginResult = await signInWithEmailAndPassword(auth, email, password)
    const uid = loginResult.user.uid

    M.toast({ html: `welcome ` + loginResult.user.email, classes: `#00796b teal darken-2` })
    window.location.replace("/Dashboard.html")

  } catch (error) {
    console.log("error", error.message)
    M.toast({ html: error.message, classes: `red` })
  }

  M.Modal.getInstance(myModal[1]).close()
}
const logoutBtn = document.querySelector("#logoutBtn")
logoutBtn.addEventListener("click", logout)

function logout() {
  getAuth().signOut()
}

const unSub = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
    const uid = user.uid;
    // ...
  } else {
    M.toast({ html: "signout success", classes: `red` })
  }

});

const googleBtn = document.querySelector("#googleBtn")
googleBtn.addEventListener("click", loginWithGoogle)

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    console.log(result)

  } catch (error) {
    console.log("errror", error.message)
  }


}

