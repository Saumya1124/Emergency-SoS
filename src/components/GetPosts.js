import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import './GetPosts.css'

function GetPosts({userName,imageURL,caption,location}) {

    

    return (


        <div className="post" >
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=''
                    src=' '
                />
                <h3>{userName}</h3>
            </div> 

            <img
                className="post__image"
                src={imageURL}
            />

            <p className="post__text">
                {/* <b>{userName}</b>  */}
                {caption}
            </p>

            <p className="post__text">
                {/* <b>{userName}</b>  */}
                {location}
            </p>

        </div>
        
    
        


         

    );
}

export default GetPosts;