import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0xrIHpzMLD4G4DNWjDvFoW6zdovRTnCg",
  authDomain: "bibliotech-bd92d.firebaseapp.com",
  projectId: "bibliotech-bd92d",
  storageBucket: "bibliotech-bd92d.appspot.com",
  messagingSenderId: "611568675295",
  appId: "1:611568675295:web:c4e2b0280e4adb18d9fc6a"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);
