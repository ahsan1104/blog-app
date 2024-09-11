import {auth,createUserWithEmailAndPassword} from "./firebase.js";

const semail = document.getElementById("semail")
const spassword = document.getElementById("spassword")
const signupbtn = document.getElementById("signupbtn")

const signup = ()=>{
   event.preventDefault();
   signupbtn.innerText = "Loding........"
   createUserWithEmailAndPassword(auth, semail.value, spassword.value)
  .then((userCredential) => {
    signupbtn.innerText = "signup"
    const user = userCredential.user;
    Toastify({
        text: "succcesfully signup",
        duration: 3000
    }).showToast();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    signupbtn.innerText = "signup"
    Toastify({
        text: `${errorMessage}`,
        duration: 3000
    }).showToast();
  });
}

signupbtn.addEventListener("click", signup)


