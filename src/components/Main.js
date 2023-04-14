import img from "../images/logo.jpg";
import './Main.css';
import React, { useState , useEffect} from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {auth} from '../firebase';


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


    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(userEmail,userPassword)
        .catch((e)=>{alert(e.message)})

        setOpenSignIn(false)



    }

    const signUp = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(userEmail, userPassword)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName : userName
                })
            })
            .catch((e)=>alert(e.message))

            setOpenSignUp(false)


    }

    useEffect(()=>{

        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if (authUser){
                setUser(authUser)
            }
            else{
                setUser(null)
            }
        })

        return () => {
            unsubscribe() 
        }

    },[Input])


    return (
        <div className="app">

            <Modal open = {openSignUp} onClose={()=>setOpenSignUp(false)}>

                <div style={modalStyle} className={classes.paper}>
                     <form className="app__signup">
                           <center>
                                <img src={img} alt="Emergency-SOS" className="logo"></img>
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
                           <br/>

                           <Button type='submit' onClick={signUp}>Sign Up</Button>

                     </form>
                </div>

            </Modal>


            <Modal open = {openSignIn} onClose={()=>setOpenSignIn(false)}>

                <div style={modalStyle} className={classes.paper}>
                     <form className="app__signup">
                           <center>
                                <img src={img} alt="Emergency-SOS" className="logo"></img>
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
            <img src={img} alt="Emergency-SOS" className="logo"></img>

            <div>
                {
                    user ?<>
                        <Button variant='contained' color='primary' onClick={()=>{auth.signOut()}}>Log Out</Button>                   
                    </>
                    : <>

                        <Button variant='contained' color='primary' onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                        <span>&nbsp;&nbsp;</span>
                        <Button variant='contained' color='primary' onClick={()=>setOpenSignUp(true)}>Sign Up</Button>

                    </>


                }
                

            </div>

        </div>

        </div>

    );
}

export default Main;