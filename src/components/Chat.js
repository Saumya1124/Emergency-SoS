import React,{useState} from 'react';
import firebase from 'firebase/compat/app';
import {storage,db} from '../firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import { useRef} from 'react';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import GetChat from './GetChat';


function Chat(userName,user) {
    const dummy = useRef();
    
    const query = db.collection('messages').orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');

  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
    //   const { uid, photoURL } = auth.currentUser;
  
      await db.collection('messages').add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userName: userName.username,
        dp : userName.userDp ,
        userId : userName.userId,
      })
  
      setFormValue('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg =>
         <GetChat 
            text={msg.text}
            userId = {msg.userId}
            userDp = {msg.dp}
            user = {user}


         />)}
  
        <span ref={dummy}></span>
  
      </main> 
  
      <form onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
  
        <button type="submit" disabled={!formValue}>🕊️</button>
  
      </form>
    </>)
  }
  
export default Chat ;