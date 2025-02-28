import { initializeApp } from "firebase/app";
import { getAuth,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";


export const environment  = {
    production: false,
    firebaseConfig :{
        apiKey: "AIzaSyDhK8gmVsxNXt9XpRqMpBcgchRFilV6Avk",
        authDomain: "starwarsapp-52865.firebaseapp.com",
        projectId: "starwarsapp-52865",
        storageBucket: "starwarsapp-52865.firebasestorage.app",
        messagingSenderId: "348253267871",
        appId: "1:348253267871:web:9069e15175f10c7df53faa",
        measurementId: "G-T6FX949DYG"
    },
    useEmulator: true // Activa el emulador
    };

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
//const db = getFirestore(firebaseApp);
//db.collection('todos').getDocs();
//const todosCol = collection(db,'todos');
//const snapshot = await getDocs(todosCol);

//Detect Auth state
onAuthStateChanged(auth, user => {
    if(user != null){
        console.log('logged in');
    }else{
        console.log('no user');
    }
})

//EMULATOR: perfect por developig and testing
/*
connectAuthEmulator(auth, 'http://localhost:9099');

const txtEmail = document.getElementById('txtEmail') as HTMLInputElement;
const txtPassword = document.getElementById('txtPassword') as HTMLInputElement;

const loginEmailPassword = async  () =>{
    const loginEmail = txtEmail.value;
    const loginPassword = txtPassword.value;

    const userCredential = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
    console.log(userCredential.user);

*/