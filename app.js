import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "./firebase.js";
import { getDoc, doc, deleteDoc, db, collection, addDoc, getDocs, updateDoc, signOut, onAuthStateChanged } from "./firebase.js";
import { auth } from "./firebase.js";

const fileInput = document.getElementById("image");
const title = document.getElementById("ptitle");
const des = document.getElementById("pdes");
const submit = document.getElementById("submit");
const show = document.getElementById("show");
let getimg = "";

// Upload the photo to Firebase Storage
function uploadPhoto() {
  return new Promise((resolve, reject) => {
    const file = fileInput.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          submit.innerText = progress !== 100 ? "Uploading..." : "Submit";
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log("Error during upload: ", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          } catch (error) {
            console.log("Error getting download URL: ", error);
            reject(error);
          }
        }
      );
    } else {
      reject("No file selected.");
    }
  });
}

// Add a new product to Firestore
async function addProduct() {
  try {
    const downloadURL = await uploadPhoto();
    getimg = downloadURL;

    await addDoc(collection(db, "product"), {
      title: title.value,
      des: des.value,
      img: getimg,
    });
    console.log("Document added successfully.");
    submit.innerText = "Submit";

    // Clear the form inputs
    title.value = "";
    des.value = "";
    fileInput.value = "";

    getProduct(); // Refresh the product list
  } catch (e) {
    console.error("Error adding document: ", e);
    submit.innerText = "Submit";
  }
}

// Submit button listener
submit.addEventListener("click", addProduct);

// Retrieve and display products from Firestore
async function getProduct() {
  show.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "product"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    show.innerHTML += `
      <div class="card pt-2 ms-1" style="width: 18rem;">
        <img src="${data.img}" class="card-img-top" alt="${data.title}">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.des.slice(0, 100)}</p>
          <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editData('${doc.id}')">Edit</button>
          <button type="button" class="btn btn-danger" onclick="deleteData('${doc.id}')">Delete</button>
          <button type="button" class="btn btn-success" onclick="viewData('${doc.id}')">View Blog</button>
        </div>
      </div>`;
  });
}

// Delete product from Firestore
window.deleteData = async (id) => {
  try {
    await deleteDoc(doc(db, "product", id));
    getProduct(); // Refresh the product list after deletion
  } catch (error) {
    console.log("Error deleting document: ", error);
  }
};

// Edit product
window.editData = async (id) => {
  const utitle = document.getElementById("utitle");
  const udes = document.getElementById("udes");

  try {
    const currentData = await getDoc(doc(db, "product", id));
    const product = currentData.data();

    // Populate modal with current product data
    utitle.value = product.title;
    udes.value = product.des;

    // Store the ID of the product being edited in the modal's update button
    const updateButton = document.querySelector("#updateProductBtn");
    updateButton.setAttribute("data-id", id);
  } catch (error) {
    console.log("Error fetching product data: ", error);
  }
};

// Update product in Firestore
window.updateProduct = async () => {
  const id = document.querySelector("#updateProductBtn").getAttribute("data-id");
  const utitle = document.getElementById("utitle");
  const udes = document.getElementById("udes");

  try {
    const newTitle = utitle.value;
    const newDescription = udes.value;

    // Update the document in Firestore
    await updateDoc(doc(db, "product", id), {
      title: newTitle,
      des: newDescription,
    });

    // Refresh the product list
    getProduct();
  } catch (error) {
    console.log("Error updating product: ", error);
  }
};

// Fetch products on page load
window.addEventListener("DOMContentLoaded", getProduct);

// Logout functionality
let logoutbtn = document.getElementById("logout");
const logout = () => {
  signOut(auth).then(() => {
    Toastify({
      text: "Successfully logged out",
      duration: 3000,
    }).showToast();
    window.location.href = './login.html';
  }).catch((error) => {
    Toastify({
      text: `Error: ${error.message}`,
      duration: 3000,
    }).showToast();
  });
};
logoutbtn.addEventListener("click", logout);

// Auth state listener to check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = './login.html';
  }
});

// View product details
window.viewData = (id) => {
  localStorage.setItem('blogId', id);
  window.location.href = './blogDetail.html';
};
















