// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
  set,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaVPNJqmih0I2XyVwztVhji4bFcBtrOCg",
  authDomain: "prog22-chat1.firebaseapp.com",
  databaseURL:
    "https://prog22-chat1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prog22-chat1",
  storageBucket: "prog22-chat1.appspot.com",
  messagingSenderId: "210213179603",
  appId: "1:210213179603:web:cead86e44c93ff84da4426",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
// =========================================================

// Set variable with Bootstrap modal
const loginModal = new bootstrap.Modal("#login-modal");
loginModal.show();

// Listen for click on login button
document.querySelector("#login-button").addEventListener("click", function () {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const auth = getAuth();

  // Sign in with Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      // Hide modal
      loginModal.hide();

      // Call function to init database
      initDatabase();
    })
    .catch((error) => {
      console.log(error);
    });
});

// Database
// =========================================================
const db = getDatabase(app);

// initializes Realtime Database and get a reference service
function initDatabase() {
  // create reference, where in the database we want to take info from
  const chatRef = ref(db, "/chat");

  // listens for database changes
  onChildAdded(chatRef, function (data) {
    // create element and append to list element
    const list = document.querySelector("ul");
    const message = document.createElement("li");

    message.innerText =
      new Date(data.key).toLocaleString("en-GB") + ": " + data.val();

    list.appendChild(message);
  });
}

const button = document.querySelector("button");

button.addEventListener("mousedown", function (event) {
  if (event.button == 0) {
    // create "unique" id for message
    const messageId = new Date().toUTCString();

    // Send to database
    set(ref(db, "chat/" + messageId), input.value);

    // Clear input
    input.value = "";
  }
});

const input = document.querySelector("input");

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    // create 'unique' id for message
    const messageId = new Date().toUTCString();

    // send to database
    set(ref(db, "chat/" + messageId), input.value);

    // clear input
    input.value = "";
  }
});
