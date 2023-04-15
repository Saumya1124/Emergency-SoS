import { Button, TextField } from "@material-ui/core";
import React,{useState} from 'react';
import firebase from 'firebase/compat/app';
import {storage,db} from '../firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const AddPost = (username) => {

    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);

    const [image, setImage]= useState(null);
    const handleChange = (e)=> {
            if(e.target.files[0]){
                setImage(e.target.files[0])
            }

    }

    const handleUpload = ()=> {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            description: description,
                            imageURL: url,
                            userName: username
                        })
                    })

            }
        )

        setDescription(' ')
        setImage(null)

    }

    return (
        <div className="imagesupload"> 
            <h2>Need help</h2>
            <br/>
            <input className="file-input" type="file" onChange={handleChange}></input>
            <br/>
            <TextField id='filled-basic' label='caption here' variant="filled" onChange={(e)=>{setDescription(e.target.value)}} value={description}
            ></TextField>
            <br/>
            <progress className="progress" value={progress} max='100'></progress>
            <br/>
            <Button variant="contained" color="primary" onClick={handleUpload}>Add Post</Button>
        </div>
    )
}

export default AddPost