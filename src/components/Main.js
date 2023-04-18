import img from "../images/logo.jpg";
import './Main.css';
import React, { useState , useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { db, auth } from "../firebase";

import firebase from 'firebase/compat/app';
import {storage} from '../firebase';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

import 'firebase/compat/auth';


import AddPost from "./AddPost";
import GetPosts from "./GetPosts";
import Chat from "./Chat";



function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Main = ()=> {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    // const [open, setOpen] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [user , setUser] = useState(null);

    const [posts, setPosts] = useState([]);

    const [dp,setDp] = useState([]);
    const[userDp , setUserDp] = useState('')


    // SignIn


    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(userEmail,userPassword)
        .catch((e)=>{alert(e.message)})

        setOpenSignIn(false)




    }


    // signUp

    const signUp = (e) => {
        e.preventDefault()
        auth
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: userName,
                    // photoURL: userDp,
                    photoURL: dp[0].post.imageURL
                });
            })
            .catch((error) => alert(error.message));

            uploadDp()

            
        setOpenSignUp(false);



    }


    // for setting user data when user logs in 

    useEffect(()=>{

        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
        
                
            } else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe() 
        }

    },[])


    // for updating post

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);


    const [image, setImage]= useState(null);

    const handleChangeDp = (e)=> {
            if(e.target.files[0]){
                setImage(e.target.files[0])
            }
            setUserDp(e.target.files[0])

    }

    const uploadDp = ()=> {
        const uploadTask = storage.ref(`dp/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            () => {
                storage
                    .ref("dp")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("dp").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageURL: url,
                            userName: userName,

                        })
                    })

            }
        )

        
        // setImage(null)

    }

    useEffect(() => {
        db.collection("dp")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setDp(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);


    



    return (
        <div className="app">

            <Modal open = {openSignUp} onClose={()=>setOpenSignUp(false)}>

                <div style={modalStyle} className={classes.paper}>
                     <form className="app__signup">
                           <center>
                                {/* <img src={img} alt="Emergency-SOS" className="logo"></img> */}
                                <p className="sign_para">Be a Helping Hand</p>
                           </center>

                           <br/>
                           <br/>

                           <Input type='text' placeholder="Name" value={userName} onChange={(e)=>{setUserName(e.target.value)}}></Input>

                           <br/>
                           <br/>

                           <Input type='text' placeholder="E-mail" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}></Input>

                           <br/>
                           <br/>

                           <Input type='password' placeholder="Password" value={userPassword} onChange={(e)=>{setUserPassword(e.target.value)}}></Input>

                           <br/>

                           <input className="file-input" type="file" onChange={handleChangeDp} ></input>

                           <br/>


                           <Button type='submit' onClick={signUp} className="sign_button" style={{color:'red!important'}}>Sign Up</Button>

                     </form>
                </div>

            </Modal>


            <Modal open = {openSignIn} onClose={()=>setOpenSignIn(false)} >

                <div style={{...modalStyle , borderRadius:'20px!important'}} className={classes.paper}>
                     <form className="app__signup">
                           <center>
                                {/* <img src={img} alt="Emergency-SOS" className="logo"></img> */}
                                <p className="sign_para">Get In to be Helping Hand</p>
                           </center>

                           <br/>
                           <br/>

                           <Input type='text' placeholder="E-mail" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}></Input>

                           <br/>
                           <br/>

                           <Input type='password' placeholder="Password" value={userPassword} onChange={(e)=>{setUserPassword(e.target.value)}}></Input>

                           <br/>
                           <br/>

                           <Button type='submit' onClick={signIn}>Sign In</Button>

                     </form>
                </div>

            </Modal>


        <div className="app__header">
            <div className="logo_header">
                <img src={img} alt="Emergency-SOS" className="logo"></img>
                <p className="logo_name">Emergency-SOS</p>
            </div>
            

            <div>
                {
                    user ?<>
                        <div className="userData">
                            <img src={user.photoURL} alt='userDp' className="userDp"></img>
                            <h3>{user.displayName}</h3>

                            <Button variant='contained' color='primary' onClick={()=>{auth.signOut()}}>Log Out</Button>   

                        </div>
                        
                                       
                    </>
                    : <>

                        <Button variant='contained' color='primary' onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                        <span>&nbsp;&nbsp;</span>
                        <Button variant='contained' color='primary' onClick={()=>setOpenSignUp(true)}>Sign Up</Button>

                    </>


                }
                

            </div>

        </div>

        {user ? 
            <> 
            

              <AddPost username={user.displayName} userDp={user.photoURL} user = {user}></AddPost>

              {/* Available Posts */}

              <div className="app__posts">
                <div className="app__postright">

                    {/* {user && user.displayName && <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2>} */}
                    <br />
                    {posts.map(({id,post}) => 
                        <GetPosts
                            key={id}
                            postId={id}
                            user={user}
                            userName={post.userName.username}
                            caption={post.description}
                            imageURL={post.imageURL}
                            location = {post.Location}
                            dp = {post.userName.userDp}                            
                        />
                    )}
                </div>
            </div>


            {/* Chat */}

            <div>
                  <Chat username={user.displayName} userDp = {user.photoURL} userId = {user.uid}
                  user = {user}></Chat>
            </div>

            </>
            :<>

                <div className="unauth">
                    Please <b style={{cursor:'pointer',color:'blue'}} onClick={()=>{setOpenSignIn(true)}}>Login</b>/<b style={{cursor:'pointer',color:'blue'}} onClick={()=>{setOpenSignUp(true)}}>Register</b>to add new post

                </div>


            </>

        }


        </div>

    );
}

export default Main;