// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVxsjyuzCDrmD3rk_ZvBlvDEMpx693L0M",
  authDomain: "input-nilai-mahasiswa-7949b.firebaseapp.com",
  projectId: "input-nilai-mahasiswa-7949b",
  storageBucket: "input-nilai-mahasiswa-7949b.firebasestorage.app",
  messagingSenderId: "683294052530",
  appId: "1:683294052530:web:3959e00b5e044f333a79ab",
  measurementId: "G-XKY467RTE6"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

console.log("Firebase initialized successfully");

// Test connection
db.collection("test").doc("test").set({
    test: "connection"
}).then(() => {
    console.log("Firestore connection test successful");
}).catch((error) => {
    console.error("Firestore connection test failed:", error);
});