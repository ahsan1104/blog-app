import { db, doc, getDoc } from "./firebase.js";


let detaildata = document.querySelector('.detaildata');
let getId = localStorage.getItem('blogId');
console.log(getId);


const showSingleData = async () => {
    detaildata.innerHTML = 'loading........'
    const docRef = doc(db, "product", getId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const { title, des, img } = docSnap.data();
        detaildata.innerHTML = `
        <img src="${img}"/>
        <h1>${title}</h1>
        <p>${des}</p>
        `
    } else {
        console.log("No such document!");
    }
}
showSingleData();
