import { addDoc, collection, limit, orderBy, query, serverTimestamp, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useRef, useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase/config";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Chat.css"

export const ChatRoom = () => {
  const resultado = useContext(ThemeContext);
  const temaEscuro = resultado.temaEscuro;
  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const messagesCollectionRef = collection(db, "messages");
    const queryRef = query(messagesCollectionRef, orderBy("createdAt"), limit(50));
    const unsub = onSnapshot(queryRef, (querySnapshot) => {
      const snapshotSize = querySnapshot.size;
      if (snapshotSize > 25) {
        const messagesToDelete = querySnapshot.docs.slice(0, snapshotSize - 25);
        messagesToDelete.forEach((doc) => deleteDoc(doc.ref));
      }
    });
    return unsub;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { photoURL, uid } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp()
    });
    setFormValue('');
    
  };

  const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p>{text}</p>
      </div>
    );
  };

  return (
  <div className={temaEscuro? "bg-light text-dark" : "bg-dark text-light"} style={{ minHeight: "100vh" }}>
    <Container>
        <h1>Chat</h1>
  <div class="chat-container">
    <div class="message-section">
      {messages &&
        messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      <div ref={dummy}></div>
    </div>
    <form onSubmit={sendMessage} class="message-input">
      <input
        type="text"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="Digite uma mensagem..."
      />
      <button type="submit" disabled={!formValue}>
        Enviar
      </button>
    </form>
  </div>
</Container>
</div>
  );
};
