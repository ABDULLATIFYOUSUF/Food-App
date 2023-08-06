// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, getDocs, collection, addDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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
        window.location.replace("/")
    }

});

window.addEventListener("load", getAllUser)

async function getAllUser() {

    const loginUser = JSON.parse(localStorage.getItem("user"))

    const docsRef = await getDocs(collection(db, "users"))
    docsRef.forEach(function (doc) {
        const user = doc.data()
        if (user.type !== "Admin") {
            console.log("docs", doc.id, user)
            const rowUi = `<tr>
        <td onclick={getuser()} >${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.type}</td>
        <td>${user.accountActivate ? `<div class="form-check form-switch">
        <input class="form-check-input" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox"  checked>
      </div>` : `<div class="form-check form-switch">
      <input class="form-check-input" id=${user.uid}  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
    </div>`
                }</td >
         </tr > `
            tableBody.innerHTML += rowUi
        }
    })

}
async function handleAccountActivation(e) {
    console.log("handleAccountActivation", e.checked)
    console.log("handleAccountActivation", e.id)

    try {
        const userRef = doc(db, "users", e.id);
        await updateDoc(userRef, {
            accountActivate: e.checked
        })

    } catch (error) {
        alert(error.message)
        console.log(error.message)
    }


}


window.handleAccountActivation = handleAccountActivation