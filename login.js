import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from "./firebase.js";

const lemail = document.getElementById("lemail");
const lpassword = document.getElementById("lpassword");
const loginbtn = document.getElementById("loginbtn");
const forgetpass = document.getElementById("forgetpass");

const login = () => {
  // Validate email and password
  if (!lemail.value || !lpassword.value) {
    Toastify({
      text: "Please enter both email and password.",
      duration: 3000
    }).showToast();
    return;
  }

  signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      Toastify({
        text: "Login successfully",
        duration: 3000
      }).showToast();
      
      // Redirecting after login
      window.location.href = '../admin.html';
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toastify({
        text: `${errorMessage}`,
        duration: 3000
      }).showToast();
    });
}

const forget = () => {
  if (!lemail.value) {
    Toastify({
      text: "Please enter your email.",
      duration: 3000
    }).showToast();
    return;
  }

  sendPasswordResetEmail(auth, lemail.value)
    .then(() => {
      Toastify({
        text: "Password reset email sent. Check your email.",
        duration: 3000
      }).showToast();
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toastify({
        text: `${errorMessage}`,
        duration: 3000
      }).showToast();
    });
}

forgetpass.addEventListener("click", forget);
loginbtn.addEventListener("click", login);





